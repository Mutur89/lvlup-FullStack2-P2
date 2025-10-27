// src/pages/admin/AdminEditarUsuario.tsx
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

const AdminEditarUsuario = () => {
  const [buscarNombre, setBuscarNombre] = useState('');
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    rol: '',
    contraseña: '',
    confirmar: '',
    telefono: '',
    region: '',
    comuna: ''
  });

  const handleBuscar = () => {
    // Tu compañero agregará la lógica de búsqueda por nombre aquí
    console.log('Buscando usuario:', buscarNombre);
    
    // Simulación de búsqueda exitosa
    if (buscarNombre) {
      setUsuarioEncontrado(true);
      setFormData({
        nombres: buscarNombre,
        apellidos: 'Apellido Ejemplo',
        correo: 'usuario@ejemplo.com',
        rol: 'admin',
        contraseña: '',
        confirmar: '',
        telefono: '+56912345678',
        region: 'Región Metropolitana de Santiago',
        comuna: 'Las Condes'
      });
      alert('Usuario encontrado (funcionalidad pendiente)');
    } else {
      alert('Por favor ingresa un nombre');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.contraseña && formData.contraseña.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (formData.contraseña !== formData.confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Tu compañero agregará la lógica de actualización aquí
    console.log('Usuario a actualizar:', formData);
    alert('Usuario actualizado (funcionalidad pendiente)');
  };

  return (
    <main className="col px-0">
      {/* Submenu */}
      <aside className="d-flex border-bottom bg-light py-3 px-3">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/usuarios/nuevo">
              Nuevo Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/admin/usuarios/editar">
              Editar Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/usuarios/mostrar">
              Mostrar Usuarios
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Editar Usuario</h3>
      </header>

      <section className="admin-content d-flex justify-content-center align-items-center py-5" style={{ minHeight: '60vh' }}>
        <div className="card shadow-sm p-4" style={{ maxWidth: '600px', width: '100%', background: '#f8f9fa' }}>
          <h5 className="fw-bold mb-4">Editor de usuario</h5>
          
          <form onSubmit={handleSubmit}>
            {/* Campo de búsqueda por nombre */}
            <div className="mb-3">
              <label htmlFor="buscarNombres" className="form-label">
                NOMBRES
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="buscarNombres"
                  placeholder="Ingresa los nombres"
                  value={buscarNombre}
                  onChange={(e) => setBuscarNombre(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleBuscar}
                >
                  Buscar
                </button>
              </div>
            </div>

            {/* Campos del formulario (deshabilitados hasta buscar) */}
            <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">
                APELLIDOS
              </label>
              <input
                type="text"
                className="form-control"
                id="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                CORREO
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                autoComplete="email"
                value={formData.correo}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rol" className="form-label">
                ROL
              </label>
              <select
                className="form-select"
                id="rol"
                value={formData.rol}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
                required
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="vendedor">Vendedor</option>
                <option value="visualizador">Visualizador</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="contraseña" className="form-label">
                CONTRASEÑA
              </label>
              <input
                type="password"
                className="form-control"
                id="contraseña"
                autoComplete="new-password"
                value={formData.contraseña}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
              />
              <div className="form-text">
                Mínimo 8 caracteres. Déjalo vacío si no deseas cambiarla.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmar" className="form-label">
                CONFIRMAR CONTRASEÑA
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmar"
                autoComplete="new-password"
                value={formData.confirmar}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
              />
              <div className="form-text">Repite la contraseña.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                TELÉFONO (opcional)
              </label>
              <input
                type="tel"
                className="form-control"
                id="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="region" className="form-label">
                  Región
                </label>
                <select
                  className="form-select"
                  id="region"
                  value={formData.region}
                  onChange={handleChange}
                  disabled={!usuarioEncontrado}
                  required
                >
                  <option value="">Seleccione la región...</option>
                  <option>Región Metropolitana de Santiago</option>
                  <option>Región de Valparaíso</option>
                  <option>Región de Biobío</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="comuna" className="form-label">
                  Comuna
                </label>
                <select
                  className="form-select"
                  id="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  disabled={!usuarioEncontrado}
                  required
                >
                  <option value="">Seleccione la comuna...</option>
                  <option>Las Condes</option>
                  <option>Maipú</option>
                  <option>Concepción</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 mt-2"
              disabled={!usuarioEncontrado}
            >
              ACTUALIZAR USUARIO
            </button>

            <div className="validation-errors text-danger mt-2" aria-live="polite"></div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminEditarUsuario;