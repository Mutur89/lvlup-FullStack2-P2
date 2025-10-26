// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-dark border-top py-4 mt-5 bg-dark text-light">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div>
          <span className="fw-bold">Level-Up Gamer</span> &copy; 2025. Todos los derechos reservados.
        </div>
        
        <div>
          <a href="#" className="me-2">Category 1</a>
          <a href="#" className="me-2">Category 2</a>
          <a href="#">Category 3</a>
        </div>
        
        <form className="d-flex align-items-center">
          <input 
            type="email" 
            className="form-control form-control-sm me-2" 
            placeholder="Enter Email" 
          />
          <button className="btn btn-dark btn-sm">Suscribirse</button>
        </form>
        
        {/* Admin quick access button */}
        <div className="ms-3">
          <Link 
            to="/admin" 
            title="Admin" 
            className="btn btn-outline-light btn-sm d-flex align-items-center" 
            style={{ gap: '8px' }}
          >
            {/* Wrench SVG icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              viewBox="0 0 16 16" 
              aria-hidden="true"
            >
              <path d="M.102 2.223a.5.5 0 0 1 .63-.316l2.853.952a4.002 4.002 0 0 1 5.003 5.003l.952 2.853a.5.5 0 0 1-.316.63l-3.75 1.25a.5.5 0 0 1-.632-.316l-.476-1.427a1.5 1.5 0 0 0-1.355-1.055L2.88 10.08a1.5 1.5 0 0 0-1.055 1.355l-1.427.476a.5.5 0 0 1-.316.632l-1.25-3.75a.5.5 0 0 1 .316-.632l2.853-.952A4.002 4.002 0 0 1 .102 2.223z"/>
            </svg>
            <span className="d-none d-md-inline">Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;