import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrder } from "../../utils/ordersService";

const AdminPedidoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = id ? getOrderById(id) : undefined;
  const [status, setStatus] = useState(order?.status || "pendiente");

  if (!order) {
    return (
      <main className="p-4">
        <div className="alert alert-danger">Pedido no encontrado.</div>
      </main>
    );
  }

  const handleSave = () => {
    const updated = updateOrder(order.id, { status });
    if (updated) {
      alert("Estado actualizado");
      navigate("/admin/pedidos");
    } else {
      alert("No se pudo actualizar el pedido");
    }
  };

  return (
    <main className="p-4">
      <h2 className="mb-3">Detalle pedido {order.id}</h2>

      <div className="card bg-dark text-light p-3 mb-3 border-success">
        <div className="mb-2">
          <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}
        </div>
        <div className="mb-2">
          <strong>Cliente:</strong>{" "}
          {order.customer.nombre || order.customer.email || "—"}
        </div>
        <div className="small">Email: {order.customer.email || "—"}</div>
        <div className="small">Tel: {order.customer.telefono || "—"}</div>
        <div className="small">
          Dirección: {order.customer.direccion || "—"}
        </div>
        <div className="mt-2">
          <strong>Total:</strong> ${order.total.toLocaleString("es-CL")}
        </div>
      </div>

      <div className="mb-3">
        <strong>Items</strong>
        <ul>
          {order.items.map((it) => (
            <li key={it.id} className="small">
              {it.id} x{it.cantidad}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select
          className="form-select bg-dark text-light border-success"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="procesando">Procesando</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-success" onClick={handleSave}>
          Guardar
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin/pedidos")}
        >
          Volver
        </button>
      </div>
    </main>
  );
};

export default AdminPedidoDetalle;
