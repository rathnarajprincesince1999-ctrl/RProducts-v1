import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPreHome from './App';
import UserHome from './feature/auth/pages/UserHome';
import AdminHome from './feature/auth/pages/AdminHome';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPreHome />} />
        <Route path="/dashboard" element={<UserHome />} />
        <Route path="/admin-dashboard" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
