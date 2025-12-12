const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden animate-spin`}>
        <img 
          src="/rathna-logo.jpg" 
          alt="Loading..." 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;