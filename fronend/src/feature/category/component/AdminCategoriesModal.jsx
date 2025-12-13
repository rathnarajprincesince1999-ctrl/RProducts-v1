import { useState, useEffect } from 'react';
import { categoryService } from '../service/categoryService';
import { showNotification } from '../../../utils/notification';

const AdminCategoriesModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', color: '#e0f2fe', logoImage: '', bannerImage: '' });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) loadCategories();
  }, [isOpen]);

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
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setMessage('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        e.target.value = '';
        return;
      }
      
      // Validate file size
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
    try {
      await categoryService.deleteCategory(id);
      showNotification('Category deleted successfully!', 'success');
      await loadCategories();
    } catch (err) {
      showNotification(err.message || 'Failed to delete category', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 rounded-2xl sm:rounded-3xl border-2 border-white/60 dark:border-blue-400/40 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-all">
          <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-300 mb-4 sm:mb-6">Manage Categories</h2>

          <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl bg-blue-50/60 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-600">
            <h3 className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-300 mb-3 sm:mb-4">{editingId ? 'Edit Category' : 'Add New Category'}</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Category Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-xl bg-white/60 dark:bg-gray-800/60 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-xl bg-white/60 dark:bg-gray-800/60 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Category Color (Light)</label>
                <input type="color" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full h-10 sm:h-12 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Logo Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logoImage')} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-xl bg-white/60 dark:bg-gray-800/60 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {formData.logoImage && <img src={formData.logoImage} alt="Logo preview" className="mt-2 w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Banner Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'bannerImage')} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-xl bg-white/60 dark:bg-gray-800/60 border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {formData.bannerImage && <img src={formData.bannerImage} alt="Banner preview" className="mt-2 w-full h-20 sm:h-24 object-cover rounded-lg" />}
              </div>
            </div>
            {message && <p className={`mt-3 text-center text-sm ${message.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</p>}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button type="submit" disabled={loading || uploading} className="flex-1 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50">
                {uploading ? 'Uploading...' : loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Category' : 'Add Category')}
              </button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', description: '', color: '#e0f2fe', logoImage: '', bannerImage: '' }); }} className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-all">Cancel</button>}
            </div>
          </form>

          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-300">Existing Categories</h3>
            {categories.length === 0 ? (
              <p className="text-center text-blue-700 dark:text-blue-400 py-6 sm:py-8 text-sm sm:text-base">No categories yet</p>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="p-3 sm:p-4 rounded-xl bg-blue-50/60 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-600">
                  {category.bannerImage && <img src={category.bannerImage} alt="banner" className="w-full h-20 sm:h-24 object-cover rounded-lg mb-2" />}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="flex-1 w-full sm:w-auto">
                      {category.logoImage && <img src={category.logoImage} alt="logo" className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg mb-2" />}
                      <p className="font-semibold text-sm sm:text-base text-blue-900 dark:text-blue-300">{category.name}</p>
                      <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-400">{category.description}</p>
                      {category.color && <div className="flex items-center gap-2 mt-1"><span className="text-xs">Color:</span><div className="w-5 h-5 sm:w-6 sm:h-6 rounded" style={{backgroundColor: category.color}}></div></div>}
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button onClick={() => handleEdit(category)} className="flex-1 sm:flex-none px-3 py-1.5 sm:py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all text-xs sm:text-sm">Edit</button>
                      <button onClick={() => handleDelete(category.id)} className="flex-1 sm:flex-none px-3 py-1.5 sm:py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all text-xs sm:text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesModal;
