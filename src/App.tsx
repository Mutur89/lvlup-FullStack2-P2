// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/client/Home';
import Contacto from './pages/client/Contacto';

// Páginas placeholder (temporales) - Tu colega las completará con lógica
const ProductosPage = () => (
  <div className="container mt-5">
    <h1>📦 Productos</h1>
    <p className="lead">Página en construcción...</p>
    <p className="text-muted">Tu colega agregará la lógica para mostrar productos aquí.</p>
  </div>
);

const CarritoPage = () => (
  <div className="container mt-5">
    <h1>🛒 Carrito de Compras</h1>
    <p className="lead">Página en construcción...</p>
    <p className="text-muted">Tu colega agregará la lógica del carrito aquí.</p>
  </div>
);

const NosotrosPage = () => (
  <div className="container mt-5">
    <h1>👥 Nosotros</h1>
    <p className="lead">Página en construcción...</p>
  </div>
);

const BlogPage = () => (
  <div className="container mt-5">
    <h1>📝 Blog</h1>
    <p className="lead">Página en construcción...</p>
  </div>
);

const ContactoPage = () => (
  <div className="container mt-5">
    <h1>📧 Contacto</h1>
    <p className="lead">Página en construcción...</p>
  </div>
);

const LoginPage = () => (
  <div className="container mt-5">
    <h1>🔐 Iniciar Sesión</h1>
    <p className="lead">Página en construcción...</p>
  </div>
);

const RegistroPage = () => (
  <div className="container mt-5">
    <h1>📝 Registro</h1>
    <p className="lead">Página en construcción...</p>
  </div>
);

const AdminDashboard = () => (
  <div className="container-fluid">
    <h1>📊 Dashboard Admin</h1>
    <p className="lead">Panel de administración en construcción...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas del sitio cliente - Usan el Layout con Header y Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<ProductosPage />} />
          <Route path="carrito" element={<CarritoPage />} />
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<RegistroPage />} />
        </Route>

        {/* Rutas del panel admin - Usan el AdminLayout con Sidebar */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Aquí agregarás más rutas admin cuando migres esas páginas */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;