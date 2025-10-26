export interface Usuario {
  id?: string;
  nombre?: string;
  apellidos?: string;
  correo?: string;
  rut?: string; // RUN/RUT
  region?: string;
  comuna?: string;
  direccion?: string;
  telefono?: string;
  rol?: string;
  // allow extra fields
  [k: string]: any;
}

export type ListadoUsuariosOptions = {
  containerId?: string;
  baseUsers?: Usuario[]; // usuarios cargados desde un archivo estático (opcional)
};

/**
 * Inicializa el listado de usuarios en el DOM.
 * - Lee usuarios desde localStorage (clave 'usuarios') y los combina con baseUsers
 * - Evita duplicados por RUT o correo (prioriza el primer encontrado)
 */
export function initListadoUsuarios(options?: ListadoUsuariosOptions): void {
  const { containerId = "listado-usuarios", baseUsers = [] } = options || {};

  let usuariosLS: Usuario[] = [];
  try {
    const raw = localStorage.getItem("usuarios");
    usuariosLS = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(usuariosLS)) usuariosLS = [];
  } catch (e) {
    usuariosLS = [];
  }

  const usuariosMap = new Map<string, Usuario>();
  const combinado = [...baseUsers, ...usuariosLS];
  combinado.forEach((u) => {
    const clave = (u && (u.rut || u.correo)) || "";
    if (clave && !usuariosMap.has(clave)) {
      usuariosMap.set(clave, u);
    }
  });

  const usuarios = Array.from(usuariosMap.values());

  const listado = document.getElementById(containerId);
  if (!listado) {
    console.warn(`Contenedor con id "${containerId}" no encontrado.`);
    return;
  }

  if (usuarios.length === 0) {
    listado.innerHTML = `<p class="text-muted">No hay usuarios registrados en la tienda.</p>`;
    return;
  }

  const rows = usuarios
    .map(
      (u) => `
            <tr>
              <td>${u.id || ""}</td>
              <td>${u.nombre || ""}</td>
              <td>${u.apellidos || ""}</td>
              <td>${u.correo || ""}</td>
              <td>${u.rut || ""}</td>
              <td>${u.region || ""}</td>
              <td>${u.comuna || ""}</td>
              <td>${u.direccion || ""}</td>
              <td>${u.telefono || ""}</td>
              <td>${u.rol ? u.rol : "Cliente"}</td>
            </tr>
          `
    )
    .join("");

  listado.innerHTML = `
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>RUN</th>
            <th>Región</th>
            <th>Comuna</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

export default initListadoUsuarios;
