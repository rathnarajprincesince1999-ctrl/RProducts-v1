import { useState, useEffect } from 'react';
import { paymentService } from '../service/paymentService';

const PaymentModal = ({ isOpen, onClose }) => {
  const [paymentType, setPaymentType] = useState('CARD');
  const [formData, setFormData] = useState({
    cardNumber: '', cardHolder: '', expiryDate: '', cvv: '', upiId: ''
  });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) loadPayments();
  }, [isOpen]);

  const loadPayments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) return;
      const data = await paymentService.getUserPayments(user.id);
      setPayments(data || []);
    } catch (err) {
      setError('Failed to load payments');
      setPayments([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) throw new Error('User not found');
      await paymentService.savePayment(user.id, { ...formData, paymentType });
      setFormData({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '', upiId: '' });
      setPaymentType('CARD');
      await loadPayments();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await paymentService.deletePayment(id);
      loadPayments();
    } catch (err) {
      setError('Failed to delete payment');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 rounded-3xl border-2 border-white/60 dark:border-emerald-400/40 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-all">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-300 mb-6">Payment Methods</h2>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4 mb-4">
              <button type="button" onClick={() => setPaymentType('CARD')} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${paymentType === 'CARD' ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Card</button>
              <button type="button" onClick={() => setPaymentType('UPI')} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${paymentType === 'UPI' ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>UPI</button>
            </div>

            {paymentType === 'CARD' ? (
              <>
                <input type="text" placeholder="Card Number" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} className="w-full mb-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-emerald-300 dark:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                <input type="text" placeholder="Card Holder Name" value={formData.cardHolder} onChange={(e) => setFormData({...formData, cardHolder: e.target.value})} className="w-full mb-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-emerald-300 dark:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                <div className="flex gap-3 mb-3">
                  <input type="text" placeholder="MM/YY" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} className="flex-1 px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-emerald-300 dark:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                  <input type="text" placeholder="CVV" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} className="flex-1 px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-emerald-300 dark:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
              </>
            ) : (
              <input type="text" placeholder="UPI ID" value={formData.upiId} onChange={(e) => setFormData({...formData, upiId: e.target.value})} className="w-full mb-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-emerald-300 dark:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
            )}

            {error && <p className="text-red-600 dark:text-red-400 mb-3">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Payment Method'}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-300">Saved Methods</h3>
            {payments.length === 0 ? (
              <p className="text-center text-emerald-700 dark:text-emerald-400 py-4">No payment methods saved yet</p>
            ) : (
              payments.map((payment) => (
              <div key={payment.id} className="flex justify-between items-center p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-600">
                <div>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-300">{payment.paymentType}</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">{payment.paymentType === 'CARD' ? `**** ${payment.cardNumber?.slice(-4)}` : payment.upiId}</p>
                </div>
                <button onClick={() => handleDelete(payment.id)} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all">Delete</button>
              </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
