import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 border-bottom border-secondary">
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold d-flex align-items-center"
            to="/"
          >
            <img
              src="/logo-lvlup.png"
              alt="Level-Up Gamer Logo"
              width="100"
              height="100"
              className="me-2"
            />
            Level-Up Gamer
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-3">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="productosDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Productos
                </a>
                <ul
                  className="dropdown-menu bg-dark text-light"
                  aria-labelledby="productosDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/productos?categoria=Juegos de Mesa"
                    >
                      Juegos de Mesa
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/productos?categoria=Consola"
                    >
                      Consola
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/productos?categoria=Computador Gamer"
                    >
                      Computadores Gamer
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/productos?categoria=Silla Gamer"
                    >
                      Silla Gamer
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/productos?categoria=Accesorios"
                    >
                      Accesorios
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/productos?categoria=Ropa"
                    >
                      Ropa
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/productos?categoria=Mouse"
                    >
                      Mouse
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/productos?categoria=Mousepad"
                    >
                      Mousepad
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-2">
                <Link className="nav-link" to="/carrito">
                  <i className="bi bi-cart"></i> Carrito ({getCartCount()})
                </Link>
              </li>
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Iniciar sesión
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/registro">
                      Registrar usuario
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      to="/perfil"
                    >
                      <i className="bi bi-person-circle me-1"></i>
                      {user.nombre || user.correo || "Perfil"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-sm btn-outline-light ms-2"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
