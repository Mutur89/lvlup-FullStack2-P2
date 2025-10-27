// src/pages/client/Home.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

// Función para obtener productos aleatorios sin repetir
const obtenerProductosAleatorios = (cantidad: number) => {
  const copia = [...products];
  const resultado = [];
  while (resultado.length < cantidad && copia.length > 0) {
    const idx = Math.floor(Math.random() * copia.length);
    resultado.push(copia.splice(idx, 1)[0]);
  }
  return resultado;
};

const Home = () => {
  const [productosDestacados, setProductosDestacados] = useState<any[]>([]);
  const [grupoActual, setGrupoActual] = useState(0);
  
  // Inicializar 20 productos aleatorios (5 grupos de 4)
  useEffect(() => {
    const productosAleatorios = obtenerProductosAleatorios(20);
    setProductosDestacados(productosAleatorios);
  }, []);

  // Cambiar de grupo cada 5 segundos
  useEffect(() => {
    if (productosDestacados.length === 0) return;

    const intervalo = setInterval(() => {
      setGrupoActual((prev) => (prev + 1) % 5); // 5 grupos (0-4)
    }, 5000); // 5 segundos

    return () => clearInterval(intervalo);
  }, [productosDestacados]);

  // Obtener los 4 productos del grupo actual
  const productosActuales = productosDestacados.slice(
    grupoActual * 4,
    grupoActual * 4 + 4
  );

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Columna izquierda: un único acceso a los blogs */}
        <aside className="col-md-2 d-none d-md-flex flex-column align-items-center banners-laterales bg-gamer-dark">
          <article>
            <Link to="/blog" className="text-decoration-none" style={{ width: '100%' }}>
              <div className="card mb-4 shadow border-dark bg-dark text-light" style={{ width: '100%' }}>
                <img 
                  src="https://i0.wp.com/entre7maletas.com/wp-content/uploads/2021/01/Juegos-de-mesa-de-viaje.jpg?fit=1000%2C748&ssl=1" 
                  className="card-img-top" 
                  alt="Blogs" 
                  style={{ height: '120px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title fw-bold">Blogs</h6>
                </div>
              </div>
            </Link>
          </article>
        </aside>

        <section className="col-12 col-md-8 bg-gamer-dark">
          {/* SECTION - Hero */}
          <section className="py-5 bg-dark-blur text-light">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  <h1 className="display-5 fw-bold">TIENDA ONLINE</h1>
                  <p className="lead hero-text">
                    Bienvenido a Level-Up Gamer, tu tienda líder en productos para gamers en Chile. 
                    Descubre los mejores juegos, accesorios y tecnología para potenciar tu experiencia.
                  </p>
                  <a href="#productos" className="btn btn-dark btn-lg mt-3">Ver productos</a>
                </div>
                
                <div className="col-md-6">
                  {/* CARRUSEL DE CATEGORÍAS */}
                  <div 
                    className="bg-light border rounded" 
                    style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
                  >
                    <div id="mainCarousel" className="carousel slide w-100 h-100" data-bs-ride="carousel">
                      <div className="carousel-inner h-100">
                        <div className="carousel-item active h-100">
                          <img 
                            src="https://i0.wp.com/www.magicsur.cl/blog/wp-content/uploads/2018/11/portada1.jpg?w=1000&ssl=1" 
                            className="d-block w-100 h-100" 
                            style={{ objectFit: 'cover' }} 
                            alt="Juegos de Mesa"
                          />
                          <div className="carousel-caption d-none d-md-block">
                            <h5 className="fw-bold">Juegos de Mesa</h5>
                          </div>
                        </div>
                        
                        <div className="carousel-item h-100">
                          <img 
                            src="https://gamerstyle.com.mx/wp-content/uploads/2020/04/Consolas-de-videojuegos.jpg" 
                            className="d-block w-100 h-100" 
                            style={{ objectFit: 'cover' }} 
                            alt="Consolas"
                          />
                          <div className="carousel-caption d-none d-md-block">
                            <h5 className="fw-bold">Consolas</h5>
                          </div>
                        </div>
                        
                        <div className="carousel-item h-100">
                          <img 
                            src="https://i.pinimg.com/736x/27/0e/12/270e12e7c5ddbdc54c3345928ab2b9a9.jpg" 
                            className="d-block w-100 h-100" 
                            style={{ objectFit: 'cover' }} 
                            alt="Computadores Gamer"
                          />
                          <div className="carousel-caption d-none d-md-block">
                            <h5 className="fw-bold">Computadores Gamer</h5>
                          </div>
                        </div>
                        
                        <div className="carousel-item h-100">
                          <img 
                            src="https://images.secretlab.co/theme/common/home-featured-ml.jpg" 
                            className="d-block w-100 h-100" 
                            style={{ objectFit: 'cover' }} 
                            alt="Sillas Gamer"
                          />
                          <div className="carousel-caption d-none d-md-block">
                            <h5 className="fw-bold">Sillas Gamer</h5>
                          </div>
                        </div>
                        
                        <div className="carousel-item h-100">
                          <img 
                            src="https://http2.mlstatic.com/D_Q_NP_2X_829207-MLC72263743361_102023-AB-polerones-roblox-gamer-4-nins-adultos.webp" 
                            className="d-block w-100 h-100" 
                            style={{ objectFit: 'cover' }} 
                            alt="Accesorios"
                          />
                          <div className="carousel-caption d-none d-md-block">
                            <h5 className="fw-bold">Accesorios</h5>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        className="carousel-control-prev" 
                        type="button" 
                        data-bs-target="#mainCarousel" 
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon"></span>
                        <span className="visually-hidden">Anterior</span>
                      </button>
                      
                      <button 
                        className="carousel-control-next" 
                        type="button" 
                        data-bs-target="#mainCarousel" 
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon"></span>
                        <span className="visually-hidden">Siguiente</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION - Productos destacados con carrusel automático */}
          <section className="py-5 bg-dark-blur text-light" id="productos">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Productos destacados del Mes</h2>
                <div className="d-flex gap-2">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <button
                      key={index}
                      className={`btn btn-sm ${
                        grupoActual === index ? 'btn-success' : 'btn-outline-success'
                      }`}
                      style={{ width: '30px', height: '30px', padding: 0 }}
                      onClick={() => setGrupoActual(index)}
                      aria-label={`Grupo ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* ARTICLE - Grid de productos */}
              <article>
                <div className="row g-4" id="destacados">
                  {productosActuales.length > 0 ? (
                    productosActuales.map((producto) => (
                      <div key={producto.id} className="col-6 col-md-4 col-lg-3">
                        <div className="card h-100 bg-dark text-light border-success">
                          <div 
                            className="bg-light d-flex align-items-center justify-content-center p-2"
                            style={{ height: '180px' }}
                          >
                            <img 
                              src={producto.imagen} 
                              alt={producto.nombre}
                              className="img-fluid"
                              style={{ 
                                maxHeight: '170px', 
                                maxWidth: '100%',
                                objectFit: 'contain' 
                              }}
                            />
                          </div>
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-success">{producto.nombre}</h5>
                            <p className="card-text text-muted small flex-grow-1">
                              {producto.descripcion.slice(0, 60)}...
                            </p>
                            <p className="fw-bold text-success mb-2">
                              ${producto.precio.toLocaleString('es-CL')} CLP
                            </p>
                            <Link
                              to={`/detalle-producto?id=${producto.id}`}
                              className="btn btn-success w-100"
                            >
                              Ver detalle
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <p className="text-muted">Cargando productos destacados...</p>
                    </div>
                  )}
                </div>
              </article>

              {/* Indicador de progreso del carrusel */}
              <div className="mt-4 text-center">
                <small className="text-muted">
                  Grupo {grupoActual + 1} de 5 • Cambio automático cada 5 segundos
                </small>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Home;