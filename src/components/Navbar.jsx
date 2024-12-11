import { useState } from 'react';
import { LuPanelLeftClose } from 'react-icons/lu';
import { RiMenu2Line } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const Links = (
    <>
      <li><NavLink to="/" className="btn btn-ghost">Home</NavLink></li>
      <li><NavLink to="/cases" className="btn btn-ghost">Cases</NavLink></li>
      <li><NavLink to="/blog" className="btn btn-ghost">Blog</NavLink></li>
      {isAuthenticated && <li><NavLink to="/contact" className="btn btn-ghost">Contact Us</NavLink></li>}
    </>
  );

  return (
    <div>
      <nav className="navbar bg-base-100 flex justify-between items-center">
        <div className="navbar bg-base-100 w-11/12 mx-auto">
          <div className="navbar-start">
            <button onClick={toggleDrawer} className="btn btn-outline mr-3 lg:hidden">
              <RiMenu2Line />
            </button>
            <div className="flex gap-3 justify-center items-center">
              <Link to="/" className="flex items-center gap-3 font-extrabold text-xl md:text-3xl font-Garamond">
                <img src="/images/business.png" alt="Equilaw Logo" className="w-5 md:w-10" />
                Equilaw
              </Link>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-gray-500">
              {Links}
            </ul>
          </div>
          <div className="navbar-end">
            {isAuthenticated ? (
              <button onClick={onLogout} className="btn btn-outline text-white font-semibold">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline text-white font-semibold">Login</Link>
            )}
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-y-0 left-0 w-1/2 bg-base-100 transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        <button
          onClick={toggleDrawer}
          className="btn btn-ghost text-2xl p-4 ml-auto"
        >
          <LuPanelLeftClose />
        </button>
        <ul className="menu p-4 text-gray-500">{Links}</ul>
      </div>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
