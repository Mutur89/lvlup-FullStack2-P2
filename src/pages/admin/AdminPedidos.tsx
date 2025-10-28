import React from "react";
import { getOrders } from "../../utils/ordersService";
import { Link } from "react-router-dom";

const AdminPedidos = () => {
  const pedidos = getOrders();

  return (
    <main className="p-4">
      <h2 className="mb-4">Pedidos</h2>
      {pedidos.length === 0 ? (
        <div className="alert alert-info">No hay pedidos registrados aún.</div>
      ) : (
        <div className="list-group">
          {pedidos.map((p) => (
            <div
              key={p.id}
              className="list-group-item mb-3 bg-dark text-light rounded border-success"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <div className="fw-bold">Pedido {p.id}</div>
                  <div className="small text-muted">
                    {new Date(p.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-success fs-5">
                  ${p.total.toLocaleString("es-CL")}
                </div>
              </div>

              <div className="mb-2">
                <div>
                  <strong>Cliente:</strong>{" "}
                  {p.customer.nombre || p.customer.email || "—"}
                </div>
                <div className="small">Email: {p.customer.email || "—"}</div>
                <div className="small">Tel: {p.customer.telefono || "—"}</div>
                <div className="small">
                  Dirección: {p.customer.direccion || "—"}
                </div>
              </div>

              <div>
                <strong>Items:</strong>
                <ul>
                  {p.items.map((it) => (
                    <li key={it.id} className="small">
                      {it.id} x{it.cantidad}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <Link
                  className="btn btn-sm btn-outline-success"
                  to={`/admin/pedidos/${p.id}`}
                >
                  Ver detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminPedidos;
