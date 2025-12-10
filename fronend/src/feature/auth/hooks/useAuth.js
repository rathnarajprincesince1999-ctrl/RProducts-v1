import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = (tokenKey = 'token', redirectPath = '/') => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      navigate(redirectPath);
    }
  }, [tokenKey, redirectPath, navigate]);
};
