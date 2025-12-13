import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from '../component/DarkModeToggle';
import AdminProfileModal from '../component/AdminProfileModal';
import { useDarkMode } from '../hooks/useDarkMode';
import { useAuth } from '../hooks/useAuth';

const AdminHome = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');
  const [isDark, setIsDark] = useDarkMode();
  const [showProfile, setShowProfile] = useState(false);
  useAuth('adminToken', '/');

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    window.history.replaceState(null, '', '/');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-950 dark:to-red-950 transition-colors duration-500">
      <nav className="backdrop-blur-xl bg-white/40 dark:bg-orange-900/30 border-b border-white/60 dark:border-orange-400/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap justify-between items-center gap-3">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">RATHNA Products - Admin</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-sm sm:text-base text-orange-800 dark:text-orange-300 font-semibold hidden sm:inline">Admin: {admin.username || 'RATHNA'}</span>
            <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
            <button onClick={handleLogout} className="px-4 py-2 sm:px-6 text-sm sm:text-base rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg">
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="backdrop-blur-2xl bg-white/60 dark:bg-orange-900/40 p-6 sm:p-10 rounded-2xl sm:rounded-3xl border-2 border-white/60 dark:border-orange-400/40 shadow-2xl dark:shadow-[0_20px_60px_rgba(249,115,22,0.3)]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-900 dark:text-orange-300 mb-4 sm:mb-6">Admin Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            <button onClick={() => setShowProfile(true)} className="backdrop-blur-lg bg-gradient-to-br from-purple-50/60 to-pink-50/40 dark:from-purple-900/40 dark:to-pink-900/30 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/60 dark:border-purple-400/40 shadow-lg dark:shadow-[0_8px_32px_rgba(168,85,247,0.3)] hover:scale-105 transition-transform cursor-pointer text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-purple-300 mb-2">Profile</h3>
              <p className="text-sm sm:text-base text-purple-700 dark:text-purple-400">Admin settings</p>
            </button>
            <button onClick={() => navigate('/admin/categories')} className="backdrop-blur-lg bg-gradient-to-br from-blue-50/60 to-cyan-50/40 dark:from-blue-900/40 dark:to-cyan-900/30 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/60 dark:border-blue-400/40 shadow-lg dark:shadow-[0_8px_32px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform cursor-pointer text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-300 mb-2">Categories</h3>
              <p className="text-sm sm:text-base text-blue-700 dark:text-blue-400">Manage categories</p>
            </button>
            <button onClick={() => navigate('/admin/products')} className="backdrop-blur-lg bg-gradient-to-br from-green-50/60 to-emerald-50/40 dark:from-green-900/40 dark:to-emerald-900/30 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/60 dark:border-green-400/40 shadow-lg dark:shadow-[0_8px_32px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform cursor-pointer text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-green-900 dark:text-green-300 mb-2">Products</h3>
              <p className="text-sm sm:text-base text-green-700 dark:text-green-400">Manage products</p>
            </button>
            <button className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/60 to-amber-50/40 dark:from-yellow-900/40 dark:to-amber-900/30 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/60 dark:border-yellow-400/40 shadow-lg dark:shadow-[0_8px_32px_rgba(234,179,8,0.3)] hover:scale-105 transition-transform cursor-pointer text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-900 dark:text-yellow-300 mb-2">Users</h3>
              <p className="text-sm sm:text-base text-yellow-700 dark:text-yellow-400">Manage users</p>
            </button>
            <button className="backdrop-blur-lg bg-gradient-to-br from-indigo-50/60 to-violet-50/40 dark:from-indigo-900/40 dark:to-violet-900/30 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/60 dark:border-indigo-400/40 shadow-lg dark:shadow-[0_8px_32px_rgba(99,102,241,0.3)] hover:scale-105 transition-transform cursor-pointer text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-2">Sellers</h3>
              <p className="text-sm sm:text-base text-indigo-700 dark:text-indigo-400">Manage sellers</p>
            </button>
            <button className="backdrop-blur-lg bg-gradient-to-br from-emerald-50/60 to-teal-50/40 dark:from-emerald-900/40 dark:to-teal-900/30 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/60 dark:border-emerald-400/40 shadow-lg dark:shadow-[0_8px_32px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform cursor-pointer text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-2">Admin Balance</h3>
              <p className="text-sm sm:text-base text-emerald-700 dark:text-emerald-400">View balance</p>
            </button>
            <button className="backdrop-blur-lg bg-gradient-to-br from-rose-50/60 to-red-50/40 dark:from-rose-900/40 dark:to-red-900/30 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/60 dark:border-rose-400/40 shadow-lg dark:shadow-[0_8px_32px_rgba(244,63,94,0.3)] hover:scale-105 transition-transform cursor-pointer text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-rose-900 dark:text-rose-300 mb-2">Transactions</h3>
              <p className="text-sm sm:text-base text-rose-700 dark:text-rose-400">View transactions</p>
            </button>
            <button className="backdrop-blur-lg bg-gradient-to-br from-orange-50/60 to-red-50/40 dark:from-orange-900/40 dark:to-red-900/30 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/60 dark:border-orange-400/40 shadow-lg dark:shadow-[0_8px_32px_rgba(249,115,22,0.3)] hover:scale-105 transition-transform cursor-pointer text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-orange-900 dark:text-orange-300 mb-2">Withdrawal Requests</h3>
              <p className="text-sm sm:text-base text-orange-700 dark:text-orange-400">Manage requests</p>
            </button>
          </div>
        </div>
      </div>
      <AdminProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} admin={admin} />
    </div>
  );
};

export default AdminHome;
