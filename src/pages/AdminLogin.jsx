import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase.config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import 'sweetalert2/dist/sweetalert2.min.css';

const db = getFirestore();

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLoginSuccess = (role) => {
    Swal.fire({
      icon: 'success',
      title: `Login successful as ${role}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire('Error', 'Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        if (role === 'admin') {
          Swal.fire('Success', 'Admin login successful', 'success');
          onLoginSuccess(role);
        } else {
          Swal.fire('Error', 'Unauthorized access: Admins only', 'error');
          await auth.signOut();
        }
      } else {
        Swal.fire('Error', 'User role not found', 'error');
        await auth.signOut();
      }
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire('Error', 'Invalid admin credentials', 'error');
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
      </div>
    </div>
  );
}

export default AdminLogin;
