# Tareas Pendientes - Integración Frontend-Backend

## ✅ Completado

1. ✅ Instalación de axios
2. ✅ Configuración de axios con JWT interceptors
3. ✅ Creación de capa de servicios API
4. ✅ Adaptación de AuthContext para autenticación con backend
5. ✅ Conversión de userService a async/await
6. ✅ Conversión de productService a async/await
7. ✅ Conversión de ordersService a async/await
8. ✅ Actualización de componentes de ejemplo (AdminMostrarProductos, Productos)
9. ✅ Build del frontend sin errores

## ⏳ Componentes Pendientes de Actualización

Los siguientes componentes usan las funciones de servicios y necesitan ser actualizados para manejar operaciones asíncronas (agregar `async/await`):

### Admin - Usuarios

#### [src/pages/admin/AdminMostrarUsuarios.tsx](src/pages/admin/AdminMostrarUsuarios.tsx)
**Funciones a actualizar:**
- Llamadas a `getUsers()` - agregar `await`
- Event listener para actualizaciones

**Patrón:**
```tsx
// ANTES
const users = getUsers();

// AHORA
const users = await getUsers();
```

#### [src/pages/admin/AdminUsuarios.tsx](src/pages/admin/AdminUsuarios.tsx)
Similar a AdminMostrarUsuarios.tsx

### Admin - Productos

#### [src/pages/admin/AdminEditarProducto.tsx](src/pages/admin/AdminEditarProducto.tsx)
**Funciones a actualizar:**
- `getProductById()` - agregar `await`
- `updateProduct()` - agregar `await`

**Ejemplo:**
```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const success = await updateProduct(formData);
  if (success) {
    // ...
  }
};
```

#### [src/pages/admin/AdminProductos.tsx](src/pages/admin/AdminProductos.tsx)
Similar a otros componentes de productos.

### Admin - Pedidos

#### [src/pages/admin/AdminPedidos.tsx](src/pages/admin/AdminPedidos.tsx)
**Funciones a actualizar:**
- `getOrders()` - agregar `await`
- `updateOrder()` - agregar `await` (si se usa)

**Patrón:**
```tsx
useEffect(() => {
  const fetchOrders = async () => {
    const orders = await getOrders();
    setOrders(orders);
  };
  fetchOrders();
}, []);
```

### Cliente

#### [src/pages/client/DetalleProducto.tsx](src/pages/client/DetalleProducto.tsx)
**Funciones a actualizar:**
- `getProductById()` - agregar `await`

**Ejemplo:**
```tsx
useEffect(() => {
  const fetchProducto = async () => {
    if (productId) {
      const producto = await getProductById(productId);
      setProducto(producto);
    }
  };
  fetchProducto();
}, [productId]);
```

#### [src/pages/client/Checkout.tsx](src/pages/client/Checkout.tsx)
**Funciones a actualizar:**
- `createOrder()` - agregar `await`
- `decrementStock()` - agregar `await`

**Ejemplo:**
```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Decrementar stock
  const stockResult = await decrementStock(cartItems);
  if (!stockResult.success) {
    // Manejar error
    return;
  }

  // Crear orden
  const order = await createOrder({
    customer: { ... },
    items: cartItems,
    total: totalAmount,
    status: 'Pendiente'
  });

  // Continuar con el flujo...
};
```

## 📝 Pasos para Actualizar Cada Componente

Para cada componente en la lista anterior:

1. **Abrir el archivo**
2. **Identificar llamadas síncronas** a:
   - `getUsers()`
   - `getProducts()`
   - `getProductById()`
   - `getOrders()`
   - `createUser()`
   - `createProduct()`
   - `createOrder()`
   - `updateUser()`
   - `updateProduct()`
   - `updateOrder()`
   - `deleteUser()`
   - `deleteProduct()`
   - `decrementStock()`

3. **Aplicar el patrón async/await**:

   **En useEffect:**
   ```tsx
   // ANTES
   useEffect(() => {
     const data = getProducts();
     setData(data);
   }, []);

   // AHORA
   useEffect(() => {
     const fetchData = async () => {
       const data = await getProducts();
       setData(data);
     };
     fetchData();
   }, []);
   ```

   **En event handlers:**
   ```tsx
   // ANTES
   const handleClick = () => {
     const result = deleteProduct(id);
   };

   // AHORA
   const handleClick = async () => {
     const result = await deleteProduct(id);
   };
   ```

4. **Agregar manejo de loading (opcional pero recomendado)**:
   ```tsx
   const [loading, setLoading] = useState(false);

   const fetchData = async () => {
     setLoading(true);
     try {
       const data = await getProducts();
       setData(data);
     } catch (error) {
       console.error('Error:', error);
     } finally {
       setLoading(false);
     }
   };
   ```

## 🧪 Testing Manual

Una vez actualizados todos los componentes:

### 1. Verificar Backend Corriendo

```bash
cd "d:\Duoc\Fullstack 2\lvlup-backend"
mvnw spring-boot:run
```

Debería ver:
```
Started TiendaApplication in X.XXX seconds
```

### 2. Iniciar Frontend

```bash
cd "d:\Duoc\Fullstack 2\lvlup-FullStack2 P2"
npm run dev
```

### 3. Probar Flujos Principales

#### Login:
1. Ir a página de login
2. Ingresar credenciales de un usuario existente
3. Verificar que se guarde el token en localStorage
4. Verificar que se redirija correctamente

#### Productos (Cliente):
1. Navegar a página de productos por categoría
2. Verificar que cargue productos desde el backend
3. Click en "Ver detalle" de un producto
4. Verificar que muestre información correcta

#### Admin - Productos:
1. Login como admin
2. Ir a admin/productos
3. Crear nuevo producto
4. Editar producto existente
5. Eliminar producto
6. Verificar que todos los cambios se reflejen en el backend

#### Admin - Usuarios:
1. Login como admin
2. Ir a admin/usuarios
3. Ver listado de usuarios
4. Crear, editar, eliminar usuarios
5. Verificar sincronización con backend

#### Checkout:
1. Agregar productos al carrito
2. Ir a checkout
3. Completar formulario
4. Crear orden
5. Verificar que:
   - Se cree la orden en el backend
   - Se decremente el stock
   - Se limpie el carrito

## 🔧 Troubleshooting

### "Network Error" o "Failed to fetch"
- ✅ Verificar que el backend esté corriendo en http://localhost:8080
- ✅ Verificar CORS en el backend
- ✅ Abrir DevTools → Network para ver detalles del error

### "401 Unauthorized"
- ✅ Verificar que el token esté guardado en localStorage
- ✅ Hacer logout y login de nuevo
- ✅ Verificar que el usuario tenga los roles correctos

### "404 Not Found"
- ✅ Verificar que la URL del endpoint sea correcta
- ✅ Revisar [src/services/api.ts](src/services/api.ts)
- ✅ Verificar que el controlador exista en el backend

### Componente no se actualiza después de crear/editar
- ✅ Verificar que se dispare el evento `products.updated` (para productos)
- ✅ Agregar useEffect con dependencias correctas
- ✅ Forzar re-fetch después de operaciones CRUD

## 📊 Estado de Componentes

| Componente | Estado | Prioridad |
|------------|--------|-----------|
| AuthContext.tsx | ✅ Completado | - |
| AdminMostrarProductos.tsx | ✅ Completado | - |
| Productos.tsx (cliente) | ✅ Completado | - |
| AdminMostrarUsuarios.tsx | ⏳ Pendiente | Alta |
| AdminUsuarios.tsx | ⏳ Pendiente | Alta |
| AdminEditarProducto.tsx | ⏳ Pendiente | Alta |
| AdminProductos.tsx | ⏳ Pendiente | Media |
| AdminPedidos.tsx | ⏳ Pendiente | Media |
| DetalleProducto.tsx | ⏳ Pendiente | Media |
| Checkout.tsx | ⏳ Pendiente | Alta |

## 🎯 Próximos Pasos Recomendados

1. Actualizar componentes de **alta prioridad** primero
2. Probar cada componente después de actualizarlo
3. Agregar indicadores de loading en la UI
4. Implementar manejo de errores más robusto
5. Considerar usar React Query o SWR para cacheo y revalidación

## 📚 Recursos

- [Documentación de Integración](./FRONTEND_BACKEND_INTEGRATION.md)
- [Configuración Axios](./src/config/axios.ts)
- [Servicios API](./src/services/api.ts)
- Swagger Backend: http://localhost:8080/swagger-ui.html
