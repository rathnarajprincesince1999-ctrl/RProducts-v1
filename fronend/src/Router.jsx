import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPreHome from './App';
import UserHome from './feature/auth/pages/UserHome';
import AdminHome from './feature/auth/pages/AdminHome';
import CategoryPage from './feature/category/pages/CategoryPage';
import AdminCategoriesPage from './feature/category/pages/AdminCategoriesPage';
import AdminProductsPage from './feature/product/pages/AdminProductsPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPreHome />} />
        <Route path="/dashboard" element={<UserHome />} />
        <Route path="/admin-dashboard" element={<AdminHome />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
