import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { auth } from '../utils/firebase.config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import 'sweetalert2/dist/sweetalert2.min.css';

const db = getFirestore();

const Login = () => {
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

  const onLoginSuccess = (role) => {
    Swal.fire({
      icon: 'success',
      title: `Login successful as ${role}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Swal.fire('Error', 'Please enter a valid email.', 'error');
      return;
    }
    if (!password) {
      Swal.fire('Error', 'Please enter your password.', 'error');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        onLoginSuccess(role);
      } else {
        throw new Error('User role not found');
      }
    } catch (error) {
      Swal.fire('Error', 'Invalid email, password, or missing role.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Swal.fire('Error', 'Please enter a valid email.', 'error');
      return;
    }
    if (!validatePassword(password)) {
      Swal.fire('Error', 'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.', 'error');
      return;
    }
    if (password !== confirmPass) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const defaultRole = 'user';
      await setDoc(doc(db, 'users', user.uid), { email, role: defaultRole });

      Swal.fire({
        icon: 'success',
        title: 'Registration successful!',
        showConfirmButton: false,
        timer: 1500,
      });
      toggleRegister();
    } catch (error) {
      Swal.fire('Error', 'Error during registration. Try a different email.', 'error');
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
    </div>
  );
};

export default Login;
