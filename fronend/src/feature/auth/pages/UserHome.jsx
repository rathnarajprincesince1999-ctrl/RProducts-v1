const UserHome = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!token) {
    window.location.href = '/';
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <nav className="backdrop-blur-xl bg-white/40 border-b border-white/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">RATHNA Products</h1>
          <div className="flex items-center gap-4">
            <span className="text-emerald-800 font-semibold">Welcome, {user.name || 'User'}</span>
            <button onClick={handleLogout} className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg">
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="backdrop-blur-2xl bg-white/60 p-10 rounded-3xl border-2 border-white/60 shadow-2xl">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">User Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-lg bg-gradient-to-br from-purple-50/60 to-pink-50/40 p-6 rounded-2xl border border-white/60 shadow-lg">
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Profile</h3>
              <p className="text-purple-700">Manage your account</p>
            </div>
            <div className="backdrop-blur-lg bg-gradient-to-br from-blue-50/60 to-cyan-50/40 p-6 rounded-2xl border border-white/60 shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Orders</h3>
              <p className="text-blue-700">View your orders</p>
            </div>
            <div className="backdrop-blur-lg bg-gradient-to-br from-green-50/60 to-emerald-50/40 p-6 rounded-2xl border border-white/60 shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-2">Settings</h3>
              <p className="text-green-700">Update preferences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
