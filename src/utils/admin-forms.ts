import initFormValidations from "./validaciones";

// Función para inicializar formularios de administración
export function initAdminForms(): void {
  initFormValidations({ selector: ".admin-form" });
}
// Inicializar al cargar el documento
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdminForms);
} else {
  initAdminForms();
}

export default initAdminForms;
