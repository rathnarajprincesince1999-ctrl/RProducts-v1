import { useState } from 'react';
import { authService } from '../service/authService';
import { validateEmail, validatePassword, validateRequired } from '../../../utils/validation';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      validateRequired(formData.name, 'Name');
      validateRequired(formData.email, 'Email');
      validateEmail(formData.email);
      validateRequired(formData.password, 'Password');
      validatePassword(formData.password);
    } catch (validationError) {
      setError(validationError.message);
      return;
    }
    
    setLoading(true);
    try {
      const response = await authService.signup(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-purple-50/80 to-pink-50/60 dark:from-purple-900/80 dark:to-pink-900/60 p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] border-2 border-white/60 dark:border-purple-400/40 shadow-[0_20px_60px_rgba(168,85,247,0.3)] w-full max-w-md animate-[scale_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-purple-900 dark:text-purple-300 hover:text-purple-600 text-2xl font-bold">✕</button>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 dark:text-purple-300 mb-6 sm:mb-8 text-center">Sign Up</h2>
        {error && <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base rounded-xl backdrop-blur-sm bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base rounded-xl backdrop-blur-sm bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            className="w-full px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base rounded-xl backdrop-blur-sm bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            minLength={6}
            required
          />
          <button type="submit" disabled={loading} className="w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4 sm:mt-6 text-sm sm:text-base text-purple-700 dark:text-purple-400">
          Already have an account? <button onClick={() => { onClose(); onSwitchToLogin(); }} className="font-bold hover:underline">Login</button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
