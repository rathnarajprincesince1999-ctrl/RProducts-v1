import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../service/productService';
import { categoryService } from '../../category/service/categoryService';

const AdminProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: '', categoryId: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data || []);
    } catch (err) {
      setMessage('Failed to load products');
      setProducts([]);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data || []);
    } catch (err) {
      setMessage('Failed to load categories');
      setCategories([]);
    }
  };

  const handleFileUpload = (e) => {
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
          setFormData({...formData, image: compressed});
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

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: '',
      categoryId: product.categoryId
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const data = { ...formData, categoryId: Number(formData.categoryId), price: Number(formData.price) };
      if (editingId && !data.image) delete data.image;
      
      if (editingId) {
        await productService.updateProduct(editingId, data);
        setMessage('Product updated successfully!');
        setEditingId(null);
      } else {
        await productService.createProduct(data);
        setMessage('Product added successfully!');
      }
      setFormData({ name: '', description: '', price: '', image: '', categoryId: '' });
      document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
      await loadProducts();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.message || `Failed to ${editingId ? 'update' : 'add'} product`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setMessage('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin-dashboard')} className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all">← Back</button>
          <h1 className="text-4xl font-bold text-green-900 dark:text-green-300">Manage Products</h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-green-200 dark:border-green-600 shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" required />
            <input type="number" step="0.01" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" required />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="md:col-span-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" rows="3" />
            <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} className="px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div>
              <label className="block text-sm font-semibold text-green-900 dark:text-green-300 mb-2">Product Image</label>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" />
              {formData.image && <img src={formData.image} alt="Product preview" className="mt-2 w-full h-32 object-cover rounded-lg" />}
            </div>
          </div>
          {message && <p className={`mt-3 text-center ${message.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</p>}
          <div className="flex gap-2 mt-4">
            <button type="submit" disabled={loading || uploading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50">
              {uploading ? 'Uploading...' : loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Product' : 'Add Product')}
            </button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', description: '', price: '', image: '', categoryId: '' }); }} className="px-6 py-3 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-all">Cancel</button>}
          </div>
        </form>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-300">Existing Products</h2>
          {products.length === 0 ? (
            <p className="text-center text-green-700 dark:text-green-400 py-12 bg-white/80 dark:bg-gray-800/80 rounded-xl">No products yet</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-green-200 dark:border-green-600 shadow-lg">
                  {product.image && <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-3" />}
                  <p className="font-semibold text-lg text-green-900 dark:text-green-300">{product.name}</p>
                  <p className="text-sm text-green-700 dark:text-green-400">{product.categoryName}</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">₹{product.price}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleEdit(product)} className="flex-1 px-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all text-sm">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all text-sm">Delete</button>
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

export default AdminProductsPage;
