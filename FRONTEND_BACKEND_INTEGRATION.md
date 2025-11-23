# Guía de Integración Frontend-Backend

## Cambios Realizados

Se ha integrado el frontend React con el backend Spring Boot. A continuación se detallan los cambios:

### 1. Instalación de Dependencias

```bash
npm install axios
```

### 2. Archivos Nuevos Creados

#### [src/config/axios.ts](src/config/axios.ts)
Configuración de axios con interceptores JWT:
- Agrega automáticamente el token a todas las peticiones
- Maneja errores 401 (Unauthorized)
- URL base: `http://localhost:8080`

#### [src/services/api.ts](src/services/api.ts)
Capa de servicios API que define todos los endpoints:
- `authApi`: Login y registro
- `usersApi`: CRUD de usuarios
- `productsApi`: CRUD de productos
- `ordersApi`: CRUD de órdenes

### 3. Archivos Modificados

#### [src/context/AuthContext.tsx](src/context/AuthContext.tsx)
- **Antes**: Autenticación con localStorage
- **Ahora**: Autenticación con backend JWT
  - `login()`: Llama a `/login`, guarda token JWT
  - `register()`: Crea usuario en backend y hace auto-login
  - `logout()`: Limpia token y datos de usuario

#### [src/utils/userService.ts](src/utils/userService.ts)
- **Antes**: Funciones síncronas con localStorage
- **Ahora**: Funciones **asíncronas** que llaman al backend
  - `getUsers()`: `GET /api/v1/users`
  - `createUser()`: `POST /api/v1/users`
  - `updateUser()`: `PUT /api/v1/users/{id}`
  - `deleteUser()`: `DELETE /api/v1/users/{id}`

#### [src/utils/productService.ts](src/utils/productService.ts)
- **Antes**: Funciones síncronas con localStorage
- **Ahora**: Funciones **asíncronas** que llaman al backend
  - `getProducts()`: `GET /api/v1/products`
  - `createProduct()`: `POST /api/v1/products`
  - `updateProduct()`: `PUT /api/v1/products/{id}`
  - `deleteProduct()`: `DELETE /api/v1/products/{id}`

#### [src/utils/ordersService.ts](src/utils/ordersService.ts)
- **Antes**: Funciones síncronas con localStorage
- **Ahora**: Funciones **asíncronas** que llaman al backend
  - `getOrders()`: `GET /api/v1/orders`
  - `createOrder()`: `POST /api/v1/orders`
  - `updateOrder()`: `PUT /api/v1/orders/{id}`

### 4. Componentes que Necesitan Actualización

Los siguientes componentes usan las funciones de servicios y **deben actualizarse** para manejar operaciones asíncronas:

#### Componentes de Admin:
- [src/pages/admin/AdminMostrarProductos.tsx](src/pages/admin/AdminMostrarProductos.tsx)
- [src/pages/admin/AdminMostrarUsuarios.tsx](src/pages/admin/AdminMostrarUsuarios.tsx)
- [src/pages/admin/AdminEditarProducto.tsx](src/pages/admin/AdminEditarProducto.tsx)
- [src/pages/admin/AdminPedidos.tsx](src/pages/admin/AdminPedidos.tsx)
- [src/pages/admin/AdminUsuarios.tsx](src/pages/admin/AdminUsuarios.tsx)
- [src/pages/admin/AdminProductos.tsx](src/pages/admin/AdminProductos.tsx)

#### Componentes de Cliente:
- [src/pages/client/Productos.tsx](src/pages/client/Productos.tsx)
- [src/pages/client/DetalleProducto.tsx](src/pages/client/DetalleProducto.tsx)
- [src/pages/client/Checkout.tsx](src/pages/client/Checkout.tsx)

## Cómo Actualizar los Componentes

### Patrón ANTES (síncrono):

```tsx
useEffect(() => {
  const productos = getProducts(); // ❌ Síncrono
  setProductos(productos);
}, []);
```

### Patrón AHORA (asíncrono):

```tsx
useEffect(() => {
  const fetchProductos = async () => {
    const productos = await getProducts(); // ✅ Asíncrono
    setProductos(productos);
  };
  fetchProductos();
}, []);
```

### Ejemplo Completo de Actualización:

**ANTES:**
```tsx
const handleEliminar = (id: string) => {
  const ok = deleteProduct(id); // ❌ Síncrono
  if (ok) {
    alert("Producto eliminado");
  }
};
```

**AHORA:**
```tsx
const handleEliminar = async (id: string) => {
  const ok = await deleteProduct(id); // ✅ Asíncrono
  if (ok) {
    alert("Producto eliminado");
  }
};
```

## Configuración del Backend

### Requisitos Previos:
1. Backend Spring Boot corriendo en `http://localhost:8080`
2. Base de datos PostgreSQL configurada
3. Script `SETUP_DATABASE.sql` ejecutado en PgAdmin4

### Verificar que el Backend Funciona:

```bash
# En el directorio del backend
cd "d:\Duoc\Fullstack 2\lvlup-backend"

# Ejecutar con Maven (desde terminal)
mvnw spring-boot:run

# O ejecutar desde IntelliJ:
# Clic derecho en TiendaApplication.java → Run 'TiendaApplication'
```

### Endpoints Disponibles:

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/login` | Autenticación | No |
| GET | `/api/v1/users` | Listar usuarios | Sí |
| POST | `/api/v1/users` | Crear usuario | Sí (ADMIN) |
| PUT | `/api/v1/users/{id}` | Actualizar usuario | Sí (ADMIN) |
| DELETE | `/api/v1/users/{id}` | Eliminar usuario | Sí (ADMIN) |
| GET | `/api/v1/products` | Listar productos | No |
| GET | `/api/v1/products/{id}` | Obtener producto | No |
| POST | `/api/v1/products` | Crear producto | Sí (ADMIN) |
| PUT | `/api/v1/products/{id}` | Actualizar producto | Sí (ADMIN) |
| DELETE | `/api/v1/products/{id}` | Eliminar producto | Sí (ADMIN) |
| GET | `/api/v1/orders` | Listar órdenes | Sí |
| POST | `/api/v1/orders` | Crear orden | Sí |

**Swagger UI:** http://localhost:8080/swagger-ui.html

## Manejo de Roles

El backend tiene 3 roles:
- `ROLE_ADMIN`: Acceso total (CRUD usuarios, productos, órdenes)
- `ROLE_VENDEDOR`: Solo lectura de productos
- `ROLE_CLIENTE`: Puede crear órdenes, ver productos

En el frontend, el rol se guarda en `localStorage` como parte del objeto `user`:
```json
{
  "id": "1",
  "nombre": "Admin",
  "correo": "admin@admin.cl",
  "rol": "ADMIN"
}
```

## Testing

### 1. Probar Login:

```tsx
// Desde la consola del navegador (con backend corriendo)
const response = await fetch('http://localhost:8080/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    correo: 'admin@admin.cl',
    contrasena: 'tu_contraseña'
  })
});
const data = await response.json();
console.log(data); // { token: "...", username: "admin@admin.cl", message: "..." }
```

### 2. Probar Productos:

```tsx
// Desde la consola del navegador
const response = await fetch('http://localhost:8080/api/v1/products');
const products = await response.json();
console.log(products);
```

## Próximos Pasos

1. ✅ Backend Spring Boot creado y configurado
2. ✅ Axios configurado con JWT
3. ✅ Servicios API creados
4. ✅ AuthContext adaptado
5. ✅ userService, productService, ordersService adaptados
6. ⏳ **PENDIENTE**: Actualizar componentes para usar async/await
7. ⏳ **PENDIENTE**: Probar integración completa
8. ⏳ **PENDIENTE**: Manejo de errores en UI

## Notas Importantes

### CORS
El backend ya tiene CORS configurado para aceptar peticiones desde cualquier origen durante desarrollo. En producción, deberás configurar los orígenes permitidos.

### Tokens JWT
- Los tokens expiran en **1 hora**
- Se guardan en `localStorage` con la key `"token"`
- El interceptor de axios agrega automáticamente el header `Authorization: Bearer {token}`

### Migracion de Datos
Si tienes datos en localStorage que quieres migrar al backend:
1. Los datos actuales en localStorage NO se eliminarán automáticamente
2. El frontend ahora obtiene datos del backend
3. Si quieres mantener datos de prueba, créalos desde el backend o Swagger

### Desarrollo Local
Para trabajar:
1. Terminal 1: `cd "d:\Duoc\Fullstack 2\lvlup-backend" && mvnw spring-boot:run`
2. Terminal 2: `cd "d:\Duoc\Fullstack 2\lvlup-FullStack2 P2" && npm run dev`
3. Frontend: http://localhost:5173
4. Backend: http://localhost:8080
5. Swagger: http://localhost:8080/swagger-ui.html
