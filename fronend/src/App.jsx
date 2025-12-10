import { useState } from 'react';
import SignupModal from './feature/auth/component/SignupModal';
import LoginModal from './feature/auth/component/LoginModal';
import AdminModal from './feature/auth/component/AdminModal';
import DarkModeToggle from './feature/auth/component/DarkModeToggle';
import { useDarkMode } from './feature/auth/hooks/useDarkMode';

const UserPreHome = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isDark, setIsDark] = useDarkMode();

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-green-950 overflow-hidden transition-colors duration-500 px-4">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
      </div>
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white/60 dark:border-emerald-400/50 shadow-xl backdrop-blur-sm bg-white/40 dark:bg-emerald-900/40 animate-spin" style={{animationDuration: '20s'}}>
        <img src="/rathna-logo.jpg" alt="RATHNA Logo" className="w-full h-full object-cover" />
      </div>
      
      <button 
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full backdrop-blur-lg bg-gradient-to-br from-orange-100/60 to-red-100/40 dark:from-orange-600/40 dark:to-red-600/30 border-2 border-white/60 dark:border-orange-400/50 shadow-[0_8px_24px_rgba(249,115,22,0.3)] dark:shadow-[0_8px_32px_rgba(249,115,22,0.5)] hover:shadow-[0_12px_32px_rgba(249,115,22,0.5)] dark:hover:shadow-[0_12px_40px_rgba(249,115,22,0.7)] transition-all duration-300 hover:scale-110 flex items-center justify-center group cursor-pointer"
        onClick={() => setShowAdmin(true)}
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:rotate-180 duration-500" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" fill="url(#adminGrad)" opacity="0.3"/>
          <path d="M32 20v24M20 32h24" stroke="url(#adminGrad2)" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="32" cy="20" r="3" fill="url(#adminGrad2)"/>
          <circle cx="44" cy="32" r="3" fill="url(#adminGrad2)"/>
          <circle cx="32" cy="44" r="3" fill="url(#adminGrad2)"/>
          <circle cx="20" cy="32" r="3" fill="url(#adminGrad2)"/>
          <defs>
            <linearGradient id="adminGrad" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#f97316"/>
              <stop offset="100%" stopColor="#ea580c"/>
            </linearGradient>
            <linearGradient id="adminGrad2" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#ea580c"/>
              <stop offset="100%" stopColor="#dc2626"/>
            </linearGradient>
          </defs>
        </svg>
      </button>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.2),transparent_50%)]" />
      <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-emerald-200 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-teal-200 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-pulse delay-1000" />
      
      <svg className="absolute top-[10%] left-[15%] w-12 h-12 opacity-20 animate-[fall_15s_linear_infinite]" viewBox="0 0 64 64">
        <path d="M32 8L40 24L56 28L44 40L48 56L32 48L16 56L20 40L8 28L24 24Z" fill="#10b981" stroke="#059669" strokeWidth="2"/>
      </svg>
      <svg className="absolute top-[5%] right-[20%] w-10 h-10 opacity-15 animate-[fall_18s_linear_infinite_2s]" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="20" fill="none" stroke="#14b8a6" strokeWidth="3" strokeDasharray="8 4"/>
        <circle cx="32" cy="32" r="8" fill="#0d9488"/>
      </svg>
      <svg className="absolute top-[15%] left-[70%] w-14 h-14 opacity-20 animate-[fall_20s_linear_infinite_4s]" viewBox="0 0 64 64">
        <path d="M32 12 L44 28 L60 32 L44 36 L32 52 L20 36 L4 32 L20 28 Z" fill="#a855f7" opacity="0.6"/>
      </svg>
      <svg className="absolute top-[8%] left-[45%] w-11 h-11 opacity-18 animate-[fall_16s_linear_infinite_1s]" viewBox="0 0 64 64">
        <rect x="20" y="20" width="24" height="24" rx="4" fill="none" stroke="#3b82f6" strokeWidth="3"/>
        <circle cx="32" cy="32" r="6" fill="#2563eb"/>
      </svg>
      <svg className="absolute top-[12%] right-[40%] w-13 h-13 opacity-17 animate-[fall_22s_linear_infinite_3s]" viewBox="0 0 64 64">
        <path d="M32 16 Q40 24 32 32 Q24 24 32 16 M32 32 Q40 40 32 48 Q24 40 32 32" fill="#ec4899" stroke="#db2777" strokeWidth="2"/>
      </svg>
      <svg className="absolute top-[6%] left-[25%] w-12 h-12 opacity-16 animate-[fall_19s_linear_infinite_5s]" viewBox="0 0 64 64">
        <polygon points="32,12 42,28 58,32 42,36 32,52 22,36 6,32 22,28" fill="none" stroke="#06b6d4" strokeWidth="2.5"/>
      </svg>
      
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 md:gap-16 w-full max-w-6xl">
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/40 to-white/20 dark:from-emerald-900/40 dark:to-green-900/30 px-6 py-4 sm:px-10 sm:py-5 rounded-2xl sm:rounded-3xl border-2 border-white/50 dark:border-emerald-400/40 shadow-[0_8px_32px_rgba(16,185,129,0.15)] dark:shadow-[0_8px_40px_rgba(16,185,129,0.3)]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-400 dark:via-green-400 dark:to-emerald-500 bg-clip-text text-transparent drop-shadow-sm text-center">RATHNA Products</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-10 w-full sm:w-auto">
          <div 
            className="group relative backdrop-blur-2xl bg-gradient-to-br from-purple-50/60 to-pink-50/40 dark:from-purple-900/40 dark:to-pink-900/30 p-8 sm:p-10 md:p-14 rounded-2xl sm:rounded-[2rem] border-2 border-white/60 dark:border-purple-400/40 shadow-[0_20px_60px_rgba(168,85,247,0.2)] dark:shadow-[0_20px_70px_rgba(168,85,247,0.4)] cursor-pointer transition-all duration-500 hover:shadow-[0_25px_70px_rgba(168,85,247,0.35)] dark:hover:shadow-[0_25px_80px_rgba(168,85,247,0.6)] hover:-translate-y-2 sm:hover:-translate-y-3 text-center w-full sm:min-w-[240px] md:min-w-[280px]"
            onClick={() => setShowSignup(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 dark:from-purple-600/20 to-transparent rounded-2xl sm:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <svg className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 drop-shadow-lg" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" fill="url(#signupGrad)" opacity="0.3"/>
              <path d="M32 16v32M16 32h32" stroke="url(#signupGrad2)" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="32" cy="32" r="24" stroke="url(#signupGrad2)" strokeWidth="3" strokeDasharray="4 4"/>
              <defs>
                <linearGradient id="signupGrad" x1="0" y1="0" x2="64" y2="64">
                  <stop offset="0%" stopColor="#a855f7"/>
                  <stop offset="100%" stopColor="#9333ea"/>
                </linearGradient>
                <linearGradient id="signupGrad2" x1="0" y1="0" x2="64" y2="64">
                  <stop offset="0%" stopColor="#9333ea"/>
                  <stop offset="100%" stopColor="#7e22ce"/>
                </linearGradient>
              </defs>
            </svg>
            <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 dark:text-purple-300 mb-2 sm:mb-4">Sign Up</h2>
            <p className="relative text-purple-700 dark:text-purple-400 font-semibold text-base sm:text-lg">Create a new account</p>
          </div>
          <div 
            className="group relative backdrop-blur-2xl bg-gradient-to-br from-blue-50/60 to-cyan-50/40 dark:from-blue-900/40 dark:to-cyan-900/30 p-8 sm:p-10 md:p-14 rounded-2xl sm:rounded-[2rem] border-2 border-white/60 dark:border-blue-400/40 shadow-[0_20px_60px_rgba(59,130,246,0.2)] dark:shadow-[0_20px_70px_rgba(59,130,246,0.4)] cursor-pointer transition-all duration-500 hover:shadow-[0_25px_70px_rgba(59,130,246,0.35)] dark:hover:shadow-[0_25px_80px_rgba(59,130,246,0.6)] hover:-translate-y-2 sm:hover:-translate-y-3 text-center w-full sm:min-w-[240px] md:min-w-[280px]"
            onClick={() => setShowLogin(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 dark:from-blue-600/20 to-transparent rounded-2xl sm:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <svg className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 transition-transform duration-500 group-hover:scale-110 drop-shadow-lg" viewBox="0 0 64 64" fill="none">
              <rect x="20" y="28" width="24" height="20" rx="2" fill="url(#loginGrad)" opacity="0.3"/>
              <rect x="20" y="28" width="24" height="20" rx="2" stroke="url(#loginGrad2)" strokeWidth="3"/>
              <path d="M26 28V20c0-3.3 2.7-6 6-6s6 2.7 6 6v8" stroke="url(#loginGrad2)" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="32" cy="38" r="3" fill="url(#loginGrad2)"/>
              <path d="M32 41v4" stroke="url(#loginGrad2)" strokeWidth="2" strokeLinecap="round"/>
              <defs>
                <linearGradient id="loginGrad" x1="0" y1="0" x2="64" y2="64">
                  <stop offset="0%" stopColor="#3b82f6"/>
                  <stop offset="100%" stopColor="#2563eb"/>
                </linearGradient>
                <linearGradient id="loginGrad2" x1="0" y1="0" x2="64" y2="64">
                  <stop offset="0%" stopColor="#2563eb"/>
                  <stop offset="100%" stopColor="#1d4ed8"/>
                </linearGradient>
              </defs>
            </svg>
            <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-300 mb-2 sm:mb-4">Login</h2>
            <p className="relative text-blue-700 dark:text-blue-400 font-semibold text-base sm:text-lg">Access your account</p>
          </div>
        </div>
      </div>

      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)} 
        onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }}
      />
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }}
      />
      <AdminModal isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </div>
  );
};

export default UserPreHome;
