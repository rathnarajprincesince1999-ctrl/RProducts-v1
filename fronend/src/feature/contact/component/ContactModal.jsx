import { useState } from 'react';
import { contactService } from '../service/contactService';
import { showNotification } from '../../../utils/notification';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      await contactService.submitContact(formData, user.id || null);
      showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      onClose();
    } catch (err) {
      showNotification(err.message || 'Failed to send message', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 rounded-3xl border-2 border-white/60 dark:border-green-400/40 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-all">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-6 text-center">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-gray-100"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-gray-100"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-green-300 dark:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-gray-100 resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;