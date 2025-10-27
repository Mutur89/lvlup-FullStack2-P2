// src/pages/client/Productos.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Product, getProductsByCategory } from '../../data/products';

const Productos = () => {
  const [searchParams] = useSearchParams();
  const [productos, setProductos] = useState<Product[]>([]);
  const categoria = searchParams.get('categoria') || '';

  useEffect(() => {
    // Filtrar productos por categoría
    if (categoria) {
      const productosFiltrados = getProductsByCategory(categoria);
      setProductos(productosFiltrados);
    }
  }, [categoria]);

  return (
    <section className="py-5" id="productos-categoria">
      <div className="container">
        <h2 className="mb-4 fw-bold text-center text-light">
          {categoria || 'Productos'}
        </h2>
        <div className="row g-4" id="contenedor-productos">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div
                key={producto.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="card h-100">
                  <div
                    className="bg-light d-flex align-items-center justify-content-center"
                    style={{
                      height: '180px',
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                  <div className="card-body bg-dark text-light d-flex flex-column h-100">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="fw-bold mb-2">
                      ${producto.precio.toLocaleString('es-CL')} CLP
                    </p>
                    <Link
                      to={`/detalle-producto?id=${producto.id}`}
                      className="btn btn-success w-100 mt-auto"
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-warning text-center">
                No se encontraron productos para esta categoría.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Productos;