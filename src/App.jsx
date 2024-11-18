import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cases from './pages/Cases';
import Blog from './pages/Blog';
import Inbox from './pages/Inbox';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import BlogManager from './pages/BlogManager';
import CaseManager from './pages/CaseManager';
import ContactUs from './pages/ContactUs';
import AdminLayout from './layout/AdminLayout';
import UserLayout from './layout/UserLayout';
import { HelmetProvider } from 'react-helmet-async';
import AdminMessages from './pages/AdminMessages';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const userAuthStatus = localStorage.getItem('isAuthenticated');
    const adminAuthStatus = localStorage.getItem('isAdminAuthenticated');
    setIsAuthenticated(userAuthStatus === 'true');
    setIsAdminAuthenticated(adminAuthStatus === 'true');
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('isAdminAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
  };

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* User Layout */}
          <Route element={<UserLayout isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/inbox" element={isAuthenticated ? <Inbox /> : <Navigate to="/login" />} />
            <Route path="/contact" element={isAuthenticated ? <ContactUs /> : <Navigate to="/login" />} />
          </Route>

          {/* Admin Layout */}
          <Route element={<AdminLayout onLogout={handleAdminLogout} />}>
            <Route path="/admin" element={isAdminAuthenticated ? <AdminPanel onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/login" element={isAdminAuthenticated ? <Navigate to="/admin" /> : <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />} />
            <Route path="/admin/blogs" element={isAdminAuthenticated ? <BlogManager /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/cases" element={isAdminAuthenticated ? <CaseManager /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/messages" element={isAdminAuthenticated ? <AdminMessages /> : <Navigate to="/admin/login" />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
