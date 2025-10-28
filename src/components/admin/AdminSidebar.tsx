import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <nav className="bg-dark text-light p-3 d-flex flex-column" style={{ width: '250px', minHeight: '100vh' }}>
      <div>
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
          <li className="nav-item">
            <Link className="nav-link text-light" to="/admin/usuarios">
              <i className="bi bi-people me-2"></i> Usuarios
            </Link>
          </li>
        </ul>
      </div>

      {/* Botón para volver al Home - Siempre al final del sidebar */}
      <div className="mt-auto pt-3 border-top border-secondary">
        <Link 
          to="/" 
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
          style={{
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#212529';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          <i className="bi bi-house-door-fill me-2"></i>
          Volver al Home
        </Link>
      </div>
    </nav>
  );
};

export default AdminSidebar;