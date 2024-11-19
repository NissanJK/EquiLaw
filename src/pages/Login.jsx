import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../utils/firebase.config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore functions
import 'react-toastify/dist/ReactToastify.css';

const db = getFirestore();

const Login = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setEmail('');
    setPassword('');
    setConfirmPass('');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email.');
      return;
    }
    if (!password) {
      toast.error('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve the user’s role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        toast.success(`Login successful as ${role}`);
        onLoginSuccess(role); // Pass role to parent component
      } else {
        throw new Error('User role not found');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid email, password, or missing role.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email.');
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.'
      );
      return;
    }
    if (password !== confirmPass) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // Register with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user role to Firestore
      const defaultRole = 'user'; // Default role for new users
      await setDoc(doc(db, 'users', user.uid), { email, role: defaultRole });

      toast.success('Registration successful!');
      toggleRegister(); // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Error during registration. Try a different email.');
    } finally {
      setLoading(false);
    }
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

        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full mb-4"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        )}

        <button
          className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
          onClick={isRegistering ? handleRegister : handleLogin}
          disabled={loading}
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <p className="mt-4 text-center">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <span onClick={toggleRegister} className="text-blue-500 cursor-pointer">
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span onClick={toggleRegister} className="text-blue-500 cursor-pointer">
                Register
              </span>
            </>
          )}
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Login;
