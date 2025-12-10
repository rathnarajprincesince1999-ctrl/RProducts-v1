import { useState, useEffect } from 'react';
import { transactionService } from '../../transaction/service/transactionService';
import { contactService } from '../../contact/service/contactService';
import { profileService } from '../service/profileService';

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: '',
    dateOfBirth: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [contactForm, setContactForm] = useState({ name: user.name || '', email: user.email || '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    if (isOpen && activeTab === 'transactions' && user?.id) loadTransactions();
  }, [isOpen, activeTab, user?.id]);

  const loadTransactions = async () => {
    try {
      const data = await transactionService.getUserTransactions(user.id);
      setTransactions(data);
    } catch (err) {
      setTransactions([]);
    }
  };

  if (!isOpen) return null;

  const handleSavePersonal = async () => {
    if (!user?.id) {
      alert('User not found');
      return;
    }
    try {
      const response = await profileService.updateUserProfile(user.id, {
        name: personalInfo.name,
        phone: personalInfo.phone,
        dateOfBirth: personalInfo.dateOfBirth
      });
      const updatedUser = {...user, name: response.name, email: response.email};
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update profile');
    }
  };

  const handleAddAddress = () => {
    const newAddress = { id: Date.now(), street: '', city: '', state: '', zip: '', country: '' };
    setAddresses([...addresses, newAddress]);
    setEditingAddress(newAddress.id);
    setShowAddressForm(true);
  };

  const handleSaveAddress = (id) => {
    setEditingAddress(null);
    setShowAddressForm(false);
    // API call to save address
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
    // API call to delete address
  };

  const handleAddPayment = () => {
    const newPayment = { id: Date.now(), paymentType: 'card', cardNumber: '', cardHolder: '', expiryDate: '', cvv: '', upiId: '' };
    setPayments([...payments, newPayment]);
    setEditingPayment(newPayment.id);
    setShowPaymentForm(true);
  };

  const handleSavePayment = (id) => {
    setEditingPayment(null);
    setShowPaymentForm(false);
    // API call to save payment
  };

  const handleDeletePayment = (id) => {
    setPayments(payments.filter(p => p.id !== id));
    // API call to delete payment
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await contactService.submitContact(user.id, contactForm);
      setMessage('Message sent successfully!');
      setContactForm({ name: user.name || '', email: user.email || '', subject: '', message: '' });
    } catch (err) {
      setMessage('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-purple-50/90 to-pink-50/70 dark:from-purple-900/90 dark:to-pink-900/70 rounded-2xl sm:rounded-3xl border-2 border-white/60 dark:border-purple-400/40 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/60 dark:border-purple-400/40">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 dark:text-purple-300">Profile</h2>
          <button onClick={onClose} className="text-purple-900 dark:text-purple-300 hover:text-purple-600 text-2xl font-bold">✕</button>
        </div>

        <div className="flex border-b border-white/60 dark:border-purple-400/40 overflow-x-auto">
          <button onClick={() => setActiveTab('personal')} className={`flex-1 px-3 py-3 text-xs sm:text-base font-semibold transition-colors whitespace-nowrap ${activeTab === 'personal' ? 'bg-purple-500/20 text-purple-900 dark:text-purple-300 border-b-2 border-purple-600' : 'text-purple-700 dark:text-purple-400'}`}>Personal</button>
          <button onClick={() => setActiveTab('addresses')} className={`flex-1 px-3 py-3 text-xs sm:text-base font-semibold transition-colors whitespace-nowrap ${activeTab === 'addresses' ? 'bg-purple-500/20 text-purple-900 dark:text-purple-300 border-b-2 border-purple-600' : 'text-purple-700 dark:text-purple-400'}`}>Addresses</button>
          <button onClick={() => setActiveTab('payments')} className={`flex-1 px-3 py-3 text-xs sm:text-base font-semibold transition-colors whitespace-nowrap ${activeTab === 'payments' ? 'bg-purple-500/20 text-purple-900 dark:text-purple-300 border-b-2 border-purple-600' : 'text-purple-700 dark:text-purple-400'}`}>Payments</button>
          <button onClick={() => setActiveTab('transactions')} className={`flex-1 px-3 py-3 text-xs sm:text-base font-semibold transition-colors whitespace-nowrap ${activeTab === 'transactions' ? 'bg-purple-500/20 text-purple-900 dark:text-purple-300 border-b-2 border-purple-600' : 'text-purple-700 dark:text-purple-400'}`}>Transactions</button>
          <button onClick={() => setActiveTab('contact')} className={`flex-1 px-3 py-3 text-xs sm:text-base font-semibold transition-colors whitespace-nowrap ${activeTab === 'contact' ? 'bg-purple-500/20 text-purple-900 dark:text-purple-300 border-b-2 border-purple-600' : 'text-purple-700 dark:text-purple-400'}`}>Contact Us</button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">Name</label>
                <input type="text" value={personalInfo.name} onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">Email</label>
                <input type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">Phone</label>
                <input type="tel" value={personalInfo.phone} onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">Date of Birth</label>
                <input type="date" value={personalInfo.dateOfBirth} onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100" />
              </div>
              <button onClick={handleSavePersonal} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">Save Changes</button>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <button onClick={handleAddAddress} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">+ Add Address</button>
              {addresses.length === 0 && !showAddressForm && (
                <p className="text-center text-purple-700 dark:text-purple-400 py-8">No addresses saved yet</p>
              )}
              {addresses.map((addr) => (
                <div key={addr.id} className="p-4 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40">
                  {editingAddress === addr.id ? (
                    <div className="space-y-3">
                      <input type="text" placeholder="Street" value={addr.street} onChange={(e) => setAddresses(addresses.map(a => a.id === addr.id ? {...a, street: e.target.value} : a))} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="City" value={addr.city} onChange={(e) => setAddresses(addresses.map(a => a.id === addr.id ? {...a, city: e.target.value} : a))} className="px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" />
                        <input type="text" placeholder="State" value={addr.state} onChange={(e) => setAddresses(addresses.map(a => a.id === addr.id ? {...a, state: e.target.value} : a))} className="px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="ZIP" value={addr.zip} onChange={(e) => setAddresses(addresses.map(a => a.id === addr.id ? {...a, zip: e.target.value} : a))} className="px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" />
                        <input type="text" placeholder="Country" value={addr.country} onChange={(e) => setAddresses(addresses.map(a => a.id === addr.id ? {...a, country: e.target.value} : a))} className="px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" />
                      </div>
                      <button onClick={() => handleSaveAddress(addr.id)} className="w-full py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600">Save</button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="text-purple-900 dark:text-purple-300">
                        <p className="font-semibold">{addr.street}</p>
                        <p>{addr.city}, {addr.state} {addr.zip}</p>
                        <p>{addr.country}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingAddress(addr.id)} className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600">Edit</button>
                        <button onClick={() => handleDeleteAddress(addr.id)} className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-3">
              {transactions.length === 0 ? (
                <p className="text-center text-purple-700 dark:text-purple-400 py-8">No transactions yet</p>
              ) : (
                transactions.map((txn) => (
                  <div key={txn.id} className="p-4 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40">
                    <div className="flex justify-between items-start">
                      <div className="text-purple-900 dark:text-purple-300">
                        <p className="font-semibold">Order #{txn.orderId}</p>
                        <p className="text-sm">{txn.paymentMethod}</p>
                        <p className="text-xs text-purple-700 dark:text-purple-400">{new Date(txn.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{txn.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${txn.status === 'SUCCESS' ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>{txn.status}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/60 to-teal-50/40 dark:from-emerald-900/40 dark:to-teal-900/30 border border-white/60 dark:border-emerald-400/40">
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-3">Get in Touch</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:rathnarajsince1999@gmail.com" className="text-emerald-800 dark:text-emerald-300 hover:underline">rathnarajsince1999@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+918248599487" className="text-emerald-800 dark:text-emerald-300 hover:underline">+91 8248599487</a>
                  </div>
                </div>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">Name</label>
                  <input type="text" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">Email</label>
                  <input type="email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">Subject</label>
                  <input type="text" value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">Message</label>
                  <textarea value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} rows="4" className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 dark:text-purple-100" required />
                </div>
                {message && <p className={`text-center ${message.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <button onClick={handleAddPayment} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">+ Add Payment Method</button>
              {payments.length === 0 && !showPaymentForm && (
                <p className="text-center text-purple-700 dark:text-purple-400 py-8">No payment methods saved yet</p>
              )}
              {payments.map((payment) => (
                <div key={payment.id} className="p-4 rounded-xl bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40">
                  {editingPayment === payment.id ? (
                    <div className="space-y-3">
                      <select value={payment.paymentType || 'card'} onChange={(e) => setPayments(payments.map(p => p.id === payment.id ? {...p, paymentType: e.target.value} : p))} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100">
                        <option value="card">Credit/Debit Card</option>
                        <option value="upi">UPI</option>
                      </select>
                      {payment.paymentType === 'upi' ? (
                        <input type="text" placeholder="UPI ID (e.g., user@paytm)" value={payment.upiId || ''} onChange={(e) => setPayments(payments.map(p => p.id === payment.id ? {...p, upiId: e.target.value} : p))} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" />
                      ) : (
                        <>
                          <input type="text" placeholder="Card Number" value={payment.cardNumber || ''} onChange={(e) => setPayments(payments.map(p => p.id === payment.id ? {...p, cardNumber: e.target.value} : p))} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" maxLength="16" />
                          <input type="text" placeholder="Card Holder Name" value={payment.cardHolder || ''} onChange={(e) => setPayments(payments.map(p => p.id === payment.id ? {...p, cardHolder: e.target.value} : p))} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="MM/YY" value={payment.expiryDate || ''} onChange={(e) => setPayments(payments.map(p => p.id === payment.id ? {...p, expiryDate: e.target.value} : p))} className="px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" maxLength="5" />
                            <input type="text" placeholder="CVV" value={payment.cvv || ''} onChange={(e) => setPayments(payments.map(p => p.id === payment.id ? {...p, cvv: e.target.value} : p))} className="px-3 py-2 rounded-lg bg-white/50 dark:bg-purple-900/30 border border-white/60 dark:border-purple-400/40 text-purple-900 dark:text-purple-100" maxLength="3" />
                          </div>
                        </>
                      )}
                      <button onClick={() => handleSavePayment(payment.id)} className="w-full py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600">Save</button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="text-purple-900 dark:text-purple-300">
                        {payment.paymentType === 'upi' ? (
                          <>
                            <p className="font-semibold">UPI Payment</p>
                            <p>{payment.upiId}</p>
                          </>
                        ) : (
                          <>
                            <p className="font-semibold">•••• •••• •••• {payment.cardNumber?.slice(-4)}</p>
                            <p>{payment.cardHolder}</p>
                            <p>Expires: {payment.expiryDate}</p>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingPayment(payment.id)} className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600">Edit</button>
                        <button onClick={() => handleDeletePayment(payment.id)} className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
