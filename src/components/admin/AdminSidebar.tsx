import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <nav className="bg-dark text-light p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="text-center mb-4">
        <img 
          src="/logo-lvlup.png"
          alt="Logo Level-Up Gamer" 
          className="rounded-circle bg-white" 
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
        <h5 className="mt-2">Admin Panel</h5>
      </div>
      
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-light" to="/admin">
            <i className="bi bi-grid-1x2 me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/admin/productos">
            <i className="bi bi-box-seam me-2"></i> Inventario
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;