// src/pages/admin/AdminMostrarProductos.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../utils/productService";

const AdminMostrarProductos = () => {
  // "Todas" será el valor vacío para mostrar todo
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productos, setProductos] = useState<any[]>([]);
  const [todosLosProductos, setTodosLosProductos] = useState<any[]>([]); // Cache local

  const categorias = [
    "Juegos de Mesa",
    "Consola",
    "Computador Gamer",
    "Silla Gamer",
    "Accesorios",
    "Ropa",
    "Mouse",
    "Mousepad",
  ];

  // Cargar productos al inicio
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const all = await getProducts();
    setTodosLosProductos(all);

    // Si ya había filtro, lo aplicamos, si no, mostramos todo
    if (categoriaSeleccionada) {
      setProductos(all.filter((p) => p.categoria === categoriaSeleccionada));
    } else {
      setProductos(all);
    }
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoria = e.target.value;
    setCategoriaSeleccionada(categoria);

    if (categoria) {
      setProductos(todosLosProductos.filter((p) => p.categoria === categoria));
    } else {
      setProductos(todosLosProductos); // Mostrar todos si no hay filtro
    }
  };

  const handleEliminar = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    const ok = await deleteProduct(id);
    if (ok) {
      // Actualizamos el estado local para no tener que recargar la API
      const nuevos = todosLosProductos.filter((p) => p.id !== id);
      setTodosLosProductos(nuevos);

      // Actualizamos la vista filtrada también
      if (categoriaSeleccionada) {
        setProductos(
          nuevos.filter((p) => p.categoria === categoriaSeleccionada)
        );
      } else {
        setProductos(nuevos);
      }
      alert("Producto eliminado correctamente");
    } else {
      alert("Error al eliminar. Verifica tus permisos.");
    }
  };

  return (
    <main id="main-admin" className="col px-0" role="main">
      {/* Submenu */}
      <aside
        style={{
          backgroundColor: "#f8f9fa",
          borderBottom: "2px solid #dee2e6",
          padding: "1rem 1.5rem",
          display: "flex",
        }}
      >
        <ul
          className="nav"
          style={{
            gap: "0.5rem",
            display: "flex",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          <li>
            <Link
              to="/admin/productos/nuevo"
              style={{
                color: "#212529",
                fontWeight: "600",
                fontSize: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "transparent",
                borderRadius: "6px",
                textDecoration: "none",
                display: "block",
                border: "1px solid transparent",
              }}
            >
              Nuevo Producto
            </Link>
          </li>
          <li>
            <Link
              to="/admin/productos/mostrar"
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "#0d6efd",
                borderRadius: "6px",
                textDecoration: "none",
                display: "block",
              }}
            >
              Mostrar Productos
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Gestión de Inventario</h3>
      </header>

      <section className="admin-content p-4">
        {/* Filtro */}
        <div className="row mb-4">
          <div className="col-md-4">
            <label className="form-label fw-bold text-dark">
              Filtrar por categoría
            </label>
            <select
              className="form-select"
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
            >
              <option value="">Mostrar Todos los Productos</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla */}
        <article className="card border-0 shadow-sm">
          <div className="card-body p-0">
            {productos.length === 0 ? (
              <div className="text-center p-5">
                <p className="text-muted">No se encontraron productos.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-4">ID</th>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th className="text-end pe-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((p) => (
                      <tr key={p.id}>
                        <td className="ps-4 text-muted">#{p.id}</td>
                        <td>
                          <img
                            src={p.imagen}
                            alt="img"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                              borderRadius: "4px",
                              border: "1px solid #eee",
                            }}
                          />
                        </td>
                        <td className="fw-bold">{p.nombre}</td>
                        <td>
                          <span className="badge bg-secondary">
                            {p.categoria}
                          </span>
                        </td>
                        <td className="text-success fw-bold">
                          ${Number(p.precio).toLocaleString("es-CL")}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              p.stock < 5 ? "bg-danger" : "bg-success"
                            }`}
                          >
                            {p.stock}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end gap-2 flex-nowrap">
                            <Link
                              to={`/admin/productos/editar?id=${p.id}`}
                              className="btn btn-sm btn-outline-primary"
                              style={{ minWidth: '36px' }}
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleEliminar(p.id)}
                              style={{ minWidth: '36px' }}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default AdminMostrarProductos;
