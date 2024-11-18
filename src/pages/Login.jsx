import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';

const Login = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setLoginEmail('');
    setLoginPass('');
    setRegisterEmail('');
    setRegisterPass('');
    setConfirmPass('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    if (!validateEmail(loginEmail)) {
      toast.error('Please enter a valid email.');
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem(loginEmail));
    if (storedUser && storedUser.password === loginPass) {
      toast('Login successful');
      localStorage.setItem('loggedInUser', loginEmail);
      onLoginSuccess();
    } else {
      toast.error('Wrong email or password.');
    }
  };

  const handleRegister = () => {
    if (!validateEmail(registerEmail)) {
      toast.error('Please enter a valid email.');
      return;
    }
    if (!validatePassword(registerPass)) {
      toast.error('Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.');
      return;
    }
    if (registerPass !== confirmPass) {
      toast.error('Passwords do not match.');
      return;
    }
    const user = { username: registerEmail, password: registerPass };
    localStorage.setItem(registerEmail, JSON.stringify(user));
    toast('Registration successful!');
    toggleRegister();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <Helmet>
        <title>EquiLaw | Login</title>
      </Helmet>
      <div className="card w-96 bg-base-100 shadow-xl p-5">
        <h2 className="text-center text-2xl font-bold mb-4">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        
        {isRegistering ? (
          <>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full mb-4"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-4"
              value={registerPass}
              onChange={(e) => setRegisterPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full mb-4"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <button className="btn btn-primary w-full" onClick={handleRegister}>
              Register
            </button>
            <p className="mt-4 text-center">
              Already have an account? <span onClick={toggleRegister} className="text-blue-500 cursor-pointer">Login</span>
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full mb-4"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-4"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
            />
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
            <p className="mt-4 text-center">
              Don't have an account? <span onClick={toggleRegister} className="text-blue-500 cursor-pointer">Register</span>
            </p>
          </>
        )}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
