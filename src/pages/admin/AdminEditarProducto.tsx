// src/pages/admin/AdminEditarProducto.tsx
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

const AdminEditarProducto = () => {
  const [buscarId, setBuscarId] = useState('');
  const [productoEncontrado, setProductoEncontrado] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: '',
    stock: '',
    imagen: ''
  });

  const categorias = [
    { value: 'JM', label: 'Juegos de Mesa' },
    { value: 'CO', label: 'Consolas' },
    { value: 'PC', label: 'Computadores Gamer' },
    { value: 'SG', label: 'Sillas Gamer' },
    { value: 'AC', label: 'Accesorios' },
    { value: 'RP', label: 'Ropa' },
    { value: 'MS', label: 'Mouse' },
    { value: 'MP', label: 'Mousepads' }
  ];

  const handleBuscar = () => {
    // Tu compañero agregará la lógica de búsqueda por ID aquí
    console.log('Buscando producto con ID:', buscarId);
    
    // Simulación de búsqueda exitosa
    if (buscarId) {
      setProductoEncontrado(true);
      setFormData({
        id: buscarId,
        nombre: 'Producto Ejemplo',
        descripcion: 'Descripción del producto',
        categoria: 'JM',
        precio: '29990',
        stock: '10',
        imagen: 'https://ejemplo.com/imagen.jpg'
      });
      alert('Producto encontrado (funcionalidad pendiente)');
    } else {
      alert('Por favor ingresa un ID');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Tu compañero agregará la lógica de actualización aquí
    console.log('Producto a actualizar:', formData);
    alert('Producto actualizado (funcionalidad pendiente)');
  };

  return (
    <main className="col px-0">
      {/* Submenu */}
      <aside className="d-flex border-bottom bg-light py-3 px-3">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/productos/nuevo">
              Nuevo Producto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/admin/productos/editar">
              Editar Producto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/productos/mostrar">
              Mostrar Productos
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Editor de Producto</h3>
      </header>

      <section className="admin-content d-flex justify-content-center align-items-center py-5" style={{ minHeight: '60vh' }}>
        <div className="card shadow-sm p-4" style={{ maxWidth: '600px', width: '100%', background: '#f8f9fa' }}>
          <h5 className="fw-bold mb-4">Editor de producto</h5>
          
          <form onSubmit={handleSubmit}>
            {/* Campo de búsqueda por ID */}
            <div className="mb-3">
              <label htmlFor="idProducto" className="form-label">
                ID DEL PRODUCTO
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="idProducto"
                  placeholder="Ingresa el ID para buscar"
                  value={buscarId}
                  onChange={(e) => setBuscarId(e.target.value)}
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
              <label htmlFor="nombre" className="form-label">
                NOMBRE DEL PRODUCTO
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={!productoEncontrado}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                DESCRIPCIÓN
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                rows={3}
                value={formData.descripcion}
                onChange={handleChange}
                disabled={!productoEncontrado}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">
                CATEGORÍA
              </label>
              <select
                className="form-select"
                id="categoria"
                value={formData.categoria}
                onChange={handleChange}
                disabled={!productoEncontrado}
                required
              >
                <option value="">Seleccione la categoría...</option>
                {categorias.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="precio" className="form-label">
                PRECIO
              </label>
              <input
                type="text"
                className="form-control"
                id="precio"
                value={formData.precio}
                onChange={handleChange}
                disabled={!productoEncontrado}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                STOCK
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                disabled={!productoEncontrado}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                IMAGEN DEL PRODUCTO (URL)
              </label>
              <input
                type="url"
                className="form-control"
                id="imagen"
                value={formData.imagen}
                onChange={handleChange}
                disabled={!productoEncontrado}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 mt-2"
              disabled={!productoEncontrado}
            >
              Actualizar Producto
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminEditarProducto;