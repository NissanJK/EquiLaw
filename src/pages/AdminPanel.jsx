import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function AdminPanel({ onLogout }) {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center">
      <Helmet>
        <title>EquiLaw | Dashboard</title>
      </Helmet>
      <div className="card w-full max-w-xl bg-base-100 shadow-lg p-6 mt-10">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">Admin Dashboard</h2>

        <nav className="flex flex-col gap-4">
          <Link
            to="/admin/blogs"
            className="btn btn-outline btn-primary w-full"
          >
            Manage Blogs
          </Link>
          <Link
            to="/admin/cases"
            className="btn btn-outline btn-secondary w-full"
          >
            Manage Cases
          </Link>
          <Link
            to="/admin/messages"
            className="btn btn-outline btn-accent w-full"
          >
            View Messages
          </Link>
          <button
            onClick={onLogout}
            className="btn btn-error w-full"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

export default AdminPanel;
