import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';

const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;