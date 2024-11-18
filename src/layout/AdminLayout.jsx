import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
