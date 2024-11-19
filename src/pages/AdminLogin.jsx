import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication
import { auth } from '../utils/firebase.config'; // Firebase Config
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Firestore Functions
import 'react-toastify/dist/ReactToastify.css';

const db = getFirestore();

function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      // Sign in using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        if (role === 'admin') {
          toast.success('Admin login successful');
          onLoginSuccess(); // Notify parent component of successful login
        } else {
          toast.error('Unauthorized access: Admins only');
          await auth.signOut(); // Log out the non-admin user
        }
      } else {
        toast.error('User role not found');
        await auth.signOut(); // Log out the user
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid admin credentials');
    } finally {
      setLoading(false);
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
          type="email"
          className="input input-bordered w-full mb-4"
          placeholder="Enter Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input input-bordered w-full mb-4"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
          onClick={handleLogin}
          disabled={loading}
        >
          Login
        </button>

        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      </div>
    </div>
  );
}

export default AdminLogin;
