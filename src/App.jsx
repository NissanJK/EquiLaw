import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cases from './pages/Cases';
import Blog from './pages/Blog';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import BlogManager from './pages/BlogManager';
import CaseManager from './pages/CaseManager';
import ContactUs from './pages/ContactUs';
import AdminLayout from './layout/AdminLayout';
import UserLayout from './layout/UserLayout';
import { HelmetProvider } from 'react-helmet-async';
import AdminMessages from './pages/AdminMessages';
import { auth } from './utils/firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import ErrorPage from './pages/ErrorPage';

const db = getFirestore();

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();

          if (userData?.role === 'admin') {
            setIsAdminAuthenticated(true);
            setIsUserAuthenticated(false);
          } else if (userData?.role === 'user') {
            setIsUserAuthenticated(true);
            setIsAdminAuthenticated(false);
          } else {
            setIsUserAuthenticated(false);
            setIsAdminAuthenticated(false);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      } else {
        setIsUserAuthenticated(false);
        setIsAdminAuthenticated(false);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserAuthenticated(false);
      setIsAdminAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* User Layout */}
          <Route element={<UserLayout isAuthenticated={isUserAuthenticated}  onLogout={handleLogout}/>}>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={isUserAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route path="/cases" element={<Cases />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={isUserAuthenticated ? <ContactUs /> : <Navigate to="/login" />} />
          </Route>

          {/* Admin Layout */}
          <Route element={<AdminLayout onLogout={handleLogout} />}>
            <Route
              path="/admin"
              element={isAdminAuthenticated ? <AdminPanel /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/login"
              element={isAdminAuthenticated ? <Navigate to="/admin" /> : <AdminLogin />}
            />
            <Route path="/admin/blogs" element={isAdminAuthenticated ? <BlogManager /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/cases" element={isAdminAuthenticated ? <CaseManager /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/messages" element={isAdminAuthenticated ? <AdminMessages /> : <Navigate to="/admin/login" />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
