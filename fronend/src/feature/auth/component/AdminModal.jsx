import { useState } from 'react';
import { API_URL } from '../../../config';

const AdminModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Invalid credentials');
      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data));
      window.location.href = '/admin-dashboard';
    } catch (error) {
      console.error('Login error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Cannot connect to server. Please check if the backend is running.');
      } else {
        setError(error.message || 'Admin login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-orange-50/80 to-red-50/60 dark:from-orange-900/80 dark:to-red-900/60 p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] border-2 border-white/60 dark:border-orange-400/40 shadow-[0_20px_60px_rgba(249,115,22,0.3)] w-full max-w-md animate-[scale_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-orange-900 dark:text-orange-300 hover:text-orange-600 text-2xl font-bold">✕</button>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-900 dark:text-orange-300 mb-6 sm:mb-8 text-center">Admin Login</h2>
        {error && <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base rounded-xl backdrop-blur-sm bg-white/50 dark:bg-orange-900/30 border border-white/60 dark:border-orange-400/40 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-900 dark:text-orange-100"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base rounded-xl backdrop-blur-sm bg-white/50 dark:bg-orange-900/30 border border-white/60 dark:border-orange-400/40 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-900 dark:text-orange-100"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading} className="w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
