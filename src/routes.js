import { Navigate, useRoutes, Routes, Route } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Setting from './pages/settings';

import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router(isLoggedIn) {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'booking', element: <User /> },
        { path: 'settings', element: <Setting /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    }
  ]);
  // return (
  //   <Routes>
  //     <Route path="/dashboard/app" element={<DashboardApp />} />
  //     <Route path="/dashboard/products" element={<Products />} />
  //     <Route path="/dashboard/user" element={<User />} />
  //     <Route path="/dashboard/blog" element={<Blog />} />
  //   </Routes>
  // );
}
