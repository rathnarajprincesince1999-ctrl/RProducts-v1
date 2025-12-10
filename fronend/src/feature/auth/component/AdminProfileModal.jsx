import { useState } from 'react';
import { profileService } from '../service/profileService';

const AdminProfileModal = ({ isOpen, onClose, admin }) => {
  const [formData, setFormData] = useState({
    username: admin.username || '',
    email: admin.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    if (formData.newPassword && !formData.currentPassword) {
      setMessage('Current password is required to change password');
      return;
    }
    if (!admin?.id) {
      setMessage('Admin not found');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const updateData = {
        username: formData.username,
        email: formData.email,
        currentPassword: formData.currentPassword || null,
        newPassword: formData.newPassword || null
      };
      const response = await profileService.updateAdminProfile(admin.id, updateData);
      localStorage.setItem('admin', JSON.stringify(response));
      setMessage('Profile updated successfully!');
      setFormData({...formData, currentPassword: '', newPassword: '', confirmPassword: ''});
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-orange-50/90 to-red-50/70 dark:from-orange-900/90 dark:to-red-900/70 rounded-2xl sm:rounded-3xl border-2 border-white/60 dark:border-orange-400/40 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/60 dark:border-orange-400/40">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-900 dark:text-orange-300">Admin Profile</h2>
          <button onClick={onClose} className="text-orange-900 dark:text-orange-300 hover:text-orange-600 text-2xl font-bold">✕</button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-orange-900 dark:text-orange-300 mb-2">Username</label>
              <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-orange-900/30 border border-white/60 dark:border-orange-400/40 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-900 dark:text-orange-100" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-orange-900 dark:text-orange-300 mb-2">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-orange-900/30 border border-white/60 dark:border-orange-400/40 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-900 dark:text-orange-100" required />
            </div>
            
            <div className="pt-4 border-t border-orange-300 dark:border-orange-600">
              <h3 className="text-lg font-bold text-orange-900 dark:text-orange-300 mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-orange-900 dark:text-orange-300 mb-2">Current Password</label>
                  <input type="password" value={formData.currentPassword} onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-orange-900/30 border border-white/60 dark:border-orange-400/40 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-900 dark:text-orange-100" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-orange-900 dark:text-orange-300 mb-2">New Password</label>
                  <input type="password" value={formData.newPassword} onChange={(e) => setFormData({...formData, newPassword: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-orange-900/30 border border-white/60 dark:border-orange-400/40 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-900 dark:text-orange-100" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-orange-900 dark:text-orange-300 mb-2">Confirm New Password</label>
                  <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-orange-900/30 border border-white/60 dark:border-orange-400/40 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-900 dark:text-orange-100" />
                </div>
              </div>
            </div>

            {message && <p className={`text-center ${message.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg disabled:opacity-50">
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileModal;
