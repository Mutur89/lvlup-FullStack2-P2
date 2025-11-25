// src/pages/admin/AdminDashboard.tsx
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  
  const stats = {
    productos: 1234,
    usuarios: 489,
    pedidosActivos: 27,
    productosBajoStock: 12
  };

  const actividadReciente = [
    {
      fecha: '2025-10-20',
      evento: 'Producto creado',
      usuario: 'admin',
      detalles: '"Silla Gamer Pro" agregado (ID: 321)'
    },
    {
      fecha: '2025-10-19',
      evento: 'Usuario registrado',
      usuario: 'jdoe',
      detalles: 'Correo: jdoe@example.com'
    },
    {
      fecha: '2025-10-18',
      evento: 'Pedido actualizado',
      usuario: 'maria',
      detalles: 'Pedido #1024 marcado como enviado'
    }
  ];

  return (
    <main id="main-admin" className="col px-0" role="main">
      {/* Header */}
      <header className="admin-header d-flex justify-content-between align-items-center p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0">Vista Administrador</h3>
        <i className="bi bi-bell fs-4"></i>
      </header>

      {/* Dashboard Content */}
      <section className="admin-content py-4">
        <div className="container-fluid">
          {/* Stats Cards - MEJORADAS CON MEJOR CONTRASTE Y RESPONSIVIDAD */}
          <div className="row g-3 mb-4">
            {/* Card Productos */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card shadow-sm border-0" style={{ background: '#f8f9fa' }}>
                <div className="card-body d-flex align-items-center justify-content-between p-3" style={{ minHeight: '100px' }}>
                  <div style={{ flex: '1 1 auto', minWidth: 0, marginRight: '0.5rem' }}>
                    <h6 className="mb-2 fw-semibold text-dark" style={{ fontSize: '0.875rem', wordWrap: 'break-word' }}>
                      Productos
                    </h6>
                    <h2 className="mb-0 fw-bold text-primary" style={{ fontSize: '2rem' }}>{stats.productos}</h2>
                  </div>
                  <i className="bi bi-box-seam text-primary" style={{ fontSize: '2.5rem', flexShrink: 0 }}></i>
                </div>
              </div>
            </div>

            {/* Card Usuarios */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card shadow-sm border-0" style={{ background: '#f8f9fa' }}>
                <div className="card-body d-flex align-items-center justify-content-between p-3" style={{ minHeight: '100px' }}>
                  <div style={{ flex: '1 1 auto', minWidth: 0, marginRight: '0.5rem' }}>
                    <h6 className="mb-2 fw-semibold text-dark" style={{ fontSize: '0.875rem', wordWrap: 'break-word' }}>
                      Usuarios
                    </h6>
                    <h2 className="mb-0 fw-bold text-success" style={{ fontSize: '2rem' }}>{stats.usuarios}</h2>
                  </div>
                  <i className="bi bi-people text-success" style={{ fontSize: '2.5rem', flexShrink: 0 }}></i>
                </div>
              </div>
            </div>

            {/* Card Pedidos Activos */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card shadow-sm border-0" style={{ background: '#f8f9fa' }}>
                <div className="card-body d-flex align-items-center justify-content-between p-3" style={{ minHeight: '100px' }}>
                  <div style={{ flex: '1 1 auto', minWidth: 0, marginRight: '0.5rem' }}>
                    <h6 className="mb-2 fw-semibold text-dark" style={{ fontSize: '0.875rem', wordWrap: 'break-word' }}>
                      Pedidos activos
                    </h6>
                    <h2 className="mb-0 fw-bold text-warning" style={{ fontSize: '2rem' }}>{stats.pedidosActivos}</h2>
                  </div>
                  <i className="bi bi-bag-check text-warning" style={{ fontSize: '2.5rem', flexShrink: 0 }}></i>
                </div>
              </div>
            </div>

            {/* Card Productos Bajo Stock */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card shadow-sm border-0" style={{ background: '#f8f9fa' }}>
                <div className="card-body d-flex align-items-center justify-content-between p-3" style={{ minHeight: '100px' }}>
                  <div style={{ flex: '1 1 auto', minWidth: 0, marginRight: '0.5rem' }}>
                    <h6 className="mb-2 fw-semibold text-dark" style={{ fontSize: '0.875rem', wordWrap: 'break-word' }}>
                      Productos con poco stock
                    </h6>
                    <h2 className="mb-0 fw-bold text-danger" style={{ fontSize: '2rem' }}>{stats.productosBajoStock}</h2>
                  </div>
                  <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '2.5rem', flexShrink: 0 }}></i>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex gap-2 flex-wrap">
                <Link className="btn btn-primary" to="/admin/productos/nuevo">
                  Nuevo producto
                </Link>
                <Link className="btn btn-outline-primary" to="/admin/usuarios/nuevo">
                  Nuevo usuario
                </Link>
                <Link className="btn btn-outline-secondary" to="/admin/productos">
                  Ver inventario
                </Link>
                <Link className="btn btn-outline-secondary" to="/admin/usuarios">
                  Ver usuarios
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h5 className="mb-0 fw-bold">Actividad reciente</h5>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="fw-semibold">Fecha</th>
                        <th className="fw-semibold">Evento</th>
                        <th className="fw-semibold">Usuario</th>
                        <th className="fw-semibold">Detalles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actividadReciente.map((actividad, index) => (
                        <tr key={index}>
                          <td className="text-muted">{actividad.fecha}</td>
                          <td className="fw-medium">{actividad.evento}</td>
                          <td>
                            <span className="badge bg-secondary">{actividad.usuario}</span>
                          </td>
                          <td className="text-muted">{actividad.detalles}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;