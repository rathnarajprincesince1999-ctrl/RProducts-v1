import { useState, useEffect } from 'react';
import { productService } from '../service/productService';
import { categoryService } from '../../category/service/categoryService';
import { isValidImageFile } from '../../../utils/validation';
import { showNotification } from '../../../utils/notification';

const AdminProductsModal = ({ isOpen, onClose }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: '', categoryId: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadProducts();
      loadCategories();
    }
  }, [isOpen]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await productService.createProduct({ ...formData, categoryId: Number(formData.categoryId), price: Number(formData.price) });
      setFormData({ name: '', description: '', price: '', image: '', categoryId: '' });
      document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
      await loadProducts();
      setMessage('Product added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      showNotification('Product deleted successfully!', 'success');
      await loadProducts();
    } catch (err) {
      showNotification(err.message || 'Failed to delete product', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 rounded-3xl border-2 border-white/60 dark:border-green-400/40 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-all">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-6">Manage Products</h2>

          <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl bg-green-50/60 dark:bg-green-900/30 border border-green-200 dark:border-green-600">
            <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4">Add New Product</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" required />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" rows="2" />
              <input type="number" step="0.01" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" required />
              <div>
                <label className="block text-sm font-semibold text-green-900 dark:text-green-300 mb-2">Product Image</label>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" />
                {formData.image && <img src={formData.image} alt="Product preview" className="mt-2 w-full h-32 object-cover rounded-lg" />}
              </div>
              <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            {message && <p className={`mt-3 text-center ${message.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</p>}
            <button type="submit" disabled={loading || uploading} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50">
              {uploading ? 'Uploading...' : loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-green-900 dark:text-green-300">Existing Products</h3>
            {products.length === 0 ? (
              <p className="text-center text-green-700 dark:text-green-400 py-8">No products yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {products.map((product) => (
                  <div key={product.id} className="p-4 rounded-xl bg-green-50/60 dark:bg-green-900/30 border border-green-200 dark:border-green-600">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-green-900 dark:text-green-300">{product.name}</p>
                        <p className="text-sm text-green-700 dark:text-green-400">{product.categoryName}</p>
                        <p className="text-sm text-green-700 dark:text-green-400">₹{product.price}</p>
                      </div>
                      <button onClick={() => handleDelete(product.id)} className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsModal;
