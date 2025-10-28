import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Perfil = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    // Generar avatar aleatorio usando pravatar (usa query param para que sea único)
    const seed = Math.floor(Math.random() * 1000000);
    setAvatarUrl(`https://i.pravatar.cc/150?u=${seed}`);
  }, []);

  return (
    <main>
      <section className="main-content">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="mb-4 text-light">Mi perfil</h2>

              <div className="card p-4 bg-dark border-success text-light">
                <div className="d-flex gap-4 align-items-center">
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="rounded-circle"
                    style={{ width: 120, height: 120, objectFit: "cover" }}
                  />

                  <div className="flex-grow-1">
                    <h4 className="fw-bold">{user?.nombre || "Usuario"}</h4>
                    <div className="text-success">{user?.correo || "—"}</div>
                    <div className="text-muted small">
                      Rol: {user?.rol || "usuario"}
                    </div>
                    <div className="mt-2">ID: {user?.id || "—"}</div>
                  </div>

                  <div style={{ minWidth: 160 }}>
                    <div className="card bg-secondary text-dark p-3 text-center">
                      <div className="fs-1 fw-bold">0</div>
                      <div className="small">Pedidos realizados</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Perfil;
