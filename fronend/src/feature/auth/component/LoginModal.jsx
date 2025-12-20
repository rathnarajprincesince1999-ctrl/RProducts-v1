import { useState } from 'react';
import { authService } from '../service/authService';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-blue-50/80 to-cyan-50/60 p-10 rounded-[2rem] border-2 border-white/60 shadow-[0_20px_60px_rgba(59,130,246,0.3)] w-full max-w-md animate-[scale_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-blue-900 hover:text-blue-600 text-2xl font-bold">✕</button>
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-3 rounded-xl backdrop-blur-sm bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl backdrop-blur-sm bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg">
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-blue-700">
          Don't have an account? <button onClick={() => { onClose(); onSwitchToSignup(); }} className="font-bold hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
