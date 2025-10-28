// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import Home from "./pages/client/Home";
import Contacto from "./pages/client/Contacto";
import Blog from "./pages/client/Blog";
import Nosotros from "./pages/client/Nosotros";
import Productos from "./pages/client/Productos";
import DetalleProducto from "./pages/client/DetalleProducto";
import Carrito from "./pages/client/Carrito";
import Login from "./pages/client/Login";
import Registro from "./pages/client/Registro";
import Checkout from "./pages/client/Checkout";
import Perfil from "./pages/client/Perfil";
import RequireAuth from "./components/RequireAuth";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminNuevoProducto from "./pages/admin/AdminNuevoProducto";
import AdminEditarProducto from "./pages/admin/AdminEditarProducto";
import AdminMostrarProductos from "./pages/admin/AdminMostrarProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminNuevoUsuario from "./pages/admin/AdminNuevoUsuario";
import AdminEditarUsuario from "./pages/admin/AdminEditarUsuario";
import AdminMostrarUsuarios from "./pages/admin/AdminMostrarUsuarios";
import AdminPedidos from "./pages/admin/AdminPedidos";
import AdminPedidoDetalle from "./pages/admin/AdminPedidoDetalle";
import RequireAdmin from "./components/RequireAdmin";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas del sitio cliente - Usan el Layout con Header y Footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="productos" element={<Productos />} />
              <Route path="detalle-producto" element={<DetalleProducto />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="checkout" element={<Checkout />} />
              <Route
                path="perfil"
                element={
                  <RequireAuth>
                    <Perfil />
                  </RequireAuth>
                }
              />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Registro />} />
            </Route>

            {/* Rutas del panel admin - Usan el AdminLayout con Sidebar */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route index element={<AdminDashboard />} />

              {/* Rutas de productos */}
              <Route path="productos" element={<AdminProductos />} />
              <Route path="productos/nuevo" element={<AdminNuevoProducto />} />
              <Route
                path="productos/editar"
                element={<AdminEditarProducto />}
              />
              <Route
                path="productos/mostrar"
                element={<AdminMostrarProductos />}
              />

              {/* Rutas de usuarios */}
              <Route path="usuarios" element={<AdminUsuarios />} />
              <Route path="usuarios/nuevo" element={<AdminNuevoUsuario />} />
              <Route path="usuarios/editar" element={<AdminEditarUsuario />} />
              <Route
                path="usuarios/mostrar"
                element={<AdminMostrarUsuarios />}
              />
              <Route path="pedidos/:id" element={<AdminPedidoDetalle />} />
              <Route path="pedidos" element={<AdminPedidos />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
