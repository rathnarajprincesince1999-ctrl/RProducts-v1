import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from '../component/DarkModeToggle';
import ProfileModal from '../component/ProfileModal';
import PaymentModal from '../../payment/component/PaymentModal';
import CartModal from '../../cart/component/CartModal';
import SearchBar from '../../search/component/SearchBar';
import ContactModal from '../../contact/component/ContactModal';
import { categoryService } from '../../category/service/categoryService';
import { productService } from '../../product/service/productService';
import { cartService } from '../../cart/service/cartService';
import { useDarkMode } from '../hooks/useDarkMode';
import { useAuth } from '../hooks/useAuth';

const UserHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isDark, setIsDark] = useDarkMode();
  const [showProfile, setShowProfile] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  useAuth('token', '/');

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    loadCategories();
    loadProducts();
    updateCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCartCount = async () => {
    const count = await cartService.getCartItemCount();
    setCartItemCount(count);
  };

  const addToCart = async (product) => {
    try {
      await cartService.addToCart(product);
      await updateCartCount();
    } catch (error) {
      // Handle error silently in production
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    try {
      const searchResults = await productService.searchProducts(term);
      setFilteredProducts(searchResults || []);
    } catch (error) {
      setFilteredProducts([]);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data || []);
    } catch (err) {
      setCategories([]);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (err) {
      setProducts([]);
      setFilteredProducts([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.history.replaceState(null, '', '/');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-green-950 transition-colors duration-500">
      <nav className="backdrop-blur-xl bg-white/40 dark:bg-emerald-900/30 border-b border-white/60 dark:border-emerald-400/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex flex-wrap justify-between items-center gap-2 sm:gap-3">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">RATHNA Products</h1>
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
            <span className="text-xs sm:text-sm md:text-base text-emerald-800 dark:text-emerald-300 font-semibold hidden md:inline">Welcome, {user.name || 'User'}</span>
            <button onClick={() => setShowProfile(true)} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full backdrop-blur-xl bg-gradient-to-br from-purple-400/30 to-pink-500/20 dark:from-purple-600/40 dark:to-pink-700/30 border-2 border-white/40 dark:border-purple-400/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center" aria-label="Profile">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" className="stroke-purple-600 dark:stroke-purple-300" />
              </svg>
            </button>
            <button onClick={() => setShowContact(true)} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full backdrop-blur-xl bg-gradient-to-br from-green-400/30 to-emerald-500/20 dark:from-green-600/40 dark:to-emerald-700/30 border-2 border-white/40 dark:border-green-400/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center" aria-label="Contact">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" className="stroke-green-600 dark:stroke-green-300" />
              </svg>
            </button>
            <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
            <button onClick={handleLogout} className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg">
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-12">
        <div className="relative backdrop-blur-2xl bg-white/60 dark:bg-emerald-900/40 p-4 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-white/60 dark:border-emerald-400/40 shadow-2xl dark:shadow-[0_20px_60px_rgba(16,185,129,0.3)]">
          <button onClick={() => setShowCart(true)} className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full backdrop-blur-xl bg-gradient-to-br from-blue-400/30 to-cyan-500/20 dark:from-blue-600/40 dark:to-cyan-700/30 border-2 border-white/40 dark:border-blue-400/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group" aria-label="Cart">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" className="stroke-blue-600 dark:stroke-blue-300" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{cartItemCount}</span>
          </button>
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-900 dark:text-emerald-300 mb-3 sm:mb-4">Categories</h2>
            <div className="flex justify-center">
              <SearchBar onSearch={handleSearch} placeholder="Search products..." />
            </div>
          </div>
          
          {categories.length === 0 ? (
            <p className="text-center text-emerald-700 dark:text-emerald-400 py-8">No categories available yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
              {categories.map((category) => (
                <div key={category.id} onClick={() => navigate(`/category/${category.id}`)} className="backdrop-blur-lg bg-gradient-to-br from-teal-50/60 to-cyan-50/40 dark:from-teal-900/40 dark:to-cyan-900/30 rounded-lg sm:rounded-xl border border-white/60 dark:border-teal-400/40 shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden">
                  {category.bannerImage && (
                    <img src={category.bannerImage} alt={category.name} className="w-full h-24 sm:h-32 md:h-40 object-cover" />
                  )}
                  <div className="p-3 sm:p-4 md:p-5">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      {category.logoImage ? (
                        <img src={category.logoImage} alt={category.name} className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-teal-200 dark:bg-teal-700 rounded-lg flex items-center justify-center text-lg sm:text-xl md:text-2xl flex-shrink-0">📦</div>
                      )}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-teal-900 dark:text-teal-300 line-clamp-2">{category.name}</h3>
                    </div>
                    {category.description && <p className="text-xs sm:text-sm text-teal-700 dark:text-teal-400 line-clamp-2">{category.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-4">
                {searchTerm ? `Search Results (${filteredProducts.length})` : 'Products'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="backdrop-blur-lg bg-gradient-to-br from-white/60 to-emerald-50/40 dark:from-emerald-900/40 dark:to-green-900/30 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-white/60 dark:border-emerald-400/40 shadow-lg hover:scale-105 transition-transform">
                    {product.image && <img src={product.image} alt={product.name} className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg mb-2 sm:mb-3" />}
                    <h4 className="text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-300 line-clamp-1 mb-1">{product.name}</h4>
                    <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 mb-1 sm:mb-2">{product.categoryName}</p>
                    {product.description && <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-500 mb-2 line-clamp-2">{product.description}</p>}
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
            </div>
          )}

        </div>
      </div>
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} user={user} />
      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
      <CartModal isOpen={showCart} onClose={() => { setShowCart(false); updateCartCount(); }} />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
};

export default UserHome;
