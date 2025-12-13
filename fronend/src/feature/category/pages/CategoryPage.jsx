import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoryService } from '../service/categoryService';
import { productService } from '../../product/service/productService';
import { cartService } from '../../cart/service/cartService';
import { showNotification } from '../../../utils/notification';
import DarkModeToggle from '../../auth/component/DarkModeToggle';
import { useDarkMode } from '../../auth/hooks/useDarkMode';
import { useAuth } from '../../auth/hooks/useAuth';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isDark, setIsDark] = useDarkMode();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  useAuth('token', '/');

  const addToCart = (product) => {
    try {
      cartService.addToCart(product);
      showNotification('Product added to cart!', 'success');
    } catch (error) {
      showNotification('Failed to add product to cart', 'error');
    }
  };

  useEffect(() => {
    loadCategory();
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const loadCategory = async () => {
    try {
      const categories = await categoryService.getAllCategories();
      const cat = categories.find(c => c.id === Number(categoryId));
      setCategory(cat);
    } catch (err) {
      setCategory(null);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await productService.getProductsByCategory(categoryId);
      setProducts(data || []);
    } catch (err) {
      setProducts([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  if (!category) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const bgColor = category.color || '#e0f2fe';

  return (
    <div className="min-h-screen transition-colors duration-500" style={{background: `linear-gradient(to bottom right, ${bgColor}, ${bgColor}dd, ${bgColor}bb)`}}>
      <nav className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/30 border-b border-white/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex flex-wrap justify-between items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => navigate('/dashboard')} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-xl bg-gradient-to-br from-blue-400/30 to-cyan-500/20 dark:from-blue-600/40 dark:to-cyan-700/30 border-2 border-white/40 dark:border-blue-400/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center" aria-label="Back">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 onClick={() => navigate('/dashboard')} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent cursor-pointer">RATHNA Products</h1>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
            <span className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-300 font-semibold hidden md:inline">Welcome, {user.name || 'User'}</span>
            <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
            <button onClick={handleLogout} className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-12">
        <div className="backdrop-blur-2xl bg-white/60 dark:bg-gray-900/40 p-4 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-white/60 shadow-2xl">
          {category.bannerImage && <img src={category.bannerImage} alt={category.name} className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-lg sm:rounded-xl mb-4 sm:mb-6" />}
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            {category.logoImage && <img src={category.logoImage} alt={category.name} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg sm:rounded-xl" />}
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">{category.name}</h2>
              {category.description && <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1 sm:mt-2">{category.description}</p>}
            </div>
          </div>

          {products.length === 0 ? (
            <p className="text-center text-gray-700 dark:text-gray-400 py-8">No products in this category yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/40 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-white/60 shadow-lg hover:scale-105 transition-transform">
                  {product.image && <img src={product.image} alt={product.name} className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg mb-2 sm:mb-3" />}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">{product.name}</h3>
                  {product.description && <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{product.description}</p>}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <p className="text-lg sm:text-xl font-bold text-green-700 dark:text-green-400">₹{product.price}</p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                    >
                      Add to Cart
                    </button>
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

export default CategoryPage;
