import { Outlet } from 'react-router-dom';

function AdminLayout({onLogout}) {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <main className="flex-grow p-4">
      <Outlet context={{ onLogout }} />
      </main>
    </div>
  );
}

export default AdminLayout;
