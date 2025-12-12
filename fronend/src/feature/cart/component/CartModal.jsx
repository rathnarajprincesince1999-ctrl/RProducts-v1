import { useState, useEffect } from 'react';
import { cartService } from '../service/cartService';

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCartItems();
    }
  }, [isOpen]);

  const loadCartItems = async () => {
    try {
      const items = await cartService.getCartItems();
      setCartItems(items);
    } catch (error) {
      // Handle error silently in production
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      setLoading(true);
      await cartService.updateQuantity(productId, newQuantity);
      await loadCartItems();
    } catch (error) {
      // Handle error silently in production
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      setLoading(true);
      await cartService.removeFromCart(productId);
      await loadCartItems();
    } catch (error) {
      // Handle error silently in production
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartService.clearCart();
      setCartItems([]);
    } catch (error) {
      // Handle error silently in production
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 rounded-3xl border-2 border-white/60 dark:border-blue-400/40 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-all">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-xl text-gray-600 dark:text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/60 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-600">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300">{item.name}</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">{item.categoryName}</p>
                      <p className="text-lg font-bold text-green-700 dark:text-green-400">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={loading}
                        className="w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={loading}
                        className="w-8 h-8 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      disabled={loading}
                      className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-blue-200 dark:border-blue-600 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-300">Total: ₹{total.toFixed(2)}</span>
                  <button 
                    onClick={clearCart}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50"
                  >
                    Clear Cart
                  </button>
                </div>
                <button 
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;