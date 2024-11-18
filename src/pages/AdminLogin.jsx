import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin({ onLoginSuccess }) {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin123') {  // Replace with your secure password mechanism
      onLoginSuccess();
    } else {
      toast.error('Invalid admin password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
        <Helmet>
            <title>EquiLaw | Admin Login</title>
        </Helmet>
      <div className="card w-full max-w-sm shadow-lg bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Admin Login</h2>

        <input
          type="password"
          className="input input-bordered w-full mb-4"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
        
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      </div>
    </div>
  );
}

export default AdminLogin;
