import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../service/categoryService';

const AdminCategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', color: '#e0f2fe', logoImage: '', bannerImage: '' });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data || []);
    } catch (err) {
      setMessage('Failed to load categories');
      setCategories([]);
    }
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setMessage('Image size should be less than 5MB');
        e.target.value = '';
        return;
      }
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxSize = 800;
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.7);
          setFormData({...formData, [field]: compressed});
          setUploading(false);
          e.target.value = '';
        };
        img.src = reader.result;
      };
      reader.onerror = () => {
        setMessage('Failed to read file');
        setUploading(false);
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description || '',
      color: category.color || '#e0f2fe',
      logoImage: '',
      bannerImage: ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const submitData = { ...formData };
      if (editingId && !submitData.logoImage) delete submitData.logoImage;
      if (editingId && !submitData.bannerImage) delete submitData.bannerImage;
      
      if (editingId) {
        await categoryService.updateCategory(editingId, submitData);
        setMessage('Category updated successfully!');
        setEditingId(null);
      } else {
        await categoryService.createCategory(submitData);
        setMessage('Category added successfully!');
      }
      setFormData({ name: '', description: '', color: '#e0f2fe', logoImage: '', bannerImage: '' });
      document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
      await loadCategories();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.message || `Failed to ${editingId ? 'update' : 'add'} category`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoryService.deleteCategory(id);
      setMessage('Category deleted successfully!');
      await loadCategories();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setMessage(err.message || 'Failed to delete category');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin-dashboard')} className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all">← Back</button>
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-300">Manage Categories</h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-blue-200 dark:border-blue-600 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">{editingId ? 'Edit Category' : 'Add New Category'}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Category Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div>
              <label className="block text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Category Color</label>
              <input type="color" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full h-12 rounded-xl bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Logo Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logoImage')} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {formData.logoImage && <img src={formData.logoImage} alt="Logo preview" className="mt-2 w-20 h-20 object-cover rounded-lg" />}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Banner Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'bannerImage')} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {formData.bannerImage && <img src={formData.bannerImage} alt="Banner preview" className="mt-2 w-full h-32 object-cover rounded-lg" />}
            </div>
          </div>
          {message && <p className={`mt-3 text-center ${message.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</p>}
          <div className="flex gap-2 mt-4">
            <button type="submit" disabled={loading || uploading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50">
              {uploading ? 'Uploading...' : loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Category' : 'Add Category')}
            </button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', description: '', color: '#e0f2fe', logoImage: '', bannerImage: '' }); }} className="px-6 py-3 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-all">Cancel</button>}
          </div>
        </form>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300">Existing Categories</h2>
          {categories.length === 0 ? (
            <p className="text-center text-blue-700 dark:text-blue-400 py-12 bg-white/80 dark:bg-gray-800/80 rounded-xl">No categories yet</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-blue-200 dark:border-blue-600 shadow-lg">
                  {category.bannerImage && <img src={category.bannerImage} alt="banner" className="w-full h-32 object-cover rounded-lg mb-3" />}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {category.logoImage && <img src={category.logoImage} alt="logo" className="w-16 h-16 object-cover rounded-lg mb-2" />}
                      <p className="font-semibold text-lg text-blue-900 dark:text-blue-300">{category.name}</p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">{category.description}</p>
                      {category.color && <div className="flex items-center gap-2 mt-2"><span className="text-xs">Color:</span><div className="w-8 h-8 rounded" style={{backgroundColor: category.color}}></div></div>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(category)} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all">Edit</button>
                      <button onClick={() => handleDelete(category.id)} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
