import { useState } from 'react';

const AdminModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Invalid credentials');
      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data));
      window.location.href = '/admin-dashboard';
    } catch (error) {
      alert('Admin login failed: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-orange-50/80 to-red-50/60 p-10 rounded-[2rem] border-2 border-white/60 shadow-[0_20px_60px_rgba(249,115,22,0.3)] w-full max-w-md animate-[scale_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-orange-900 hover:text-orange-600 text-2xl font-bold">✕</button>
        <h2 className="text-4xl font-bold text-orange-900 mb-8 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-5 py-3 rounded-xl backdrop-blur-sm bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-900"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl backdrop-blur-sm bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-900"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
