import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

function UserLayout({ isAuthenticated, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main className="">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default UserLayout;
