const DarkModeToggle = ({ isDark, setIsDark }) => {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="w-12 h-12 rounded-full backdrop-blur-xl bg-gradient-to-br from-emerald-400/30 to-green-500/20 dark:from-emerald-600/40 dark:to-green-700/30 border-2 border-white/40 dark:border-emerald-400/50 shadow-[0_8px_24px_rgba(16,185,129,0.3)] dark:shadow-[0_8px_32px_rgba(16,185,129,0.5)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.5)] dark:hover:shadow-[0_12px_40px_rgba(16,185,129,0.7)] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6">
        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" fill="url(#sunGrad)" />
          <g stroke="url(#sunGrad2)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </g>
          <defs>
            <linearGradient id="sunGrad" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="sunGrad2" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="url(#moonGrad)"
            stroke="url(#moonGrad2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="moonGrad" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="moonGrad2" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </button>
  );
};

export default DarkModeToggle;
