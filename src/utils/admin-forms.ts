import initFormValidations from './validaciones';

/**
 * Inicializa validaciones específicas para formularios de administración.
 * Usa selector '.admin-form' por defecto para no interferir con otros formularios.
 */
export function initAdminForms(): void {
  // Puedes cambiar el selector si tus formularios admin usan otro selector o id
  initFormValidations({ selector: '.admin-form' });
}

// Auto-inicializar solo en la página de admin cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdminForms);
} else {
  initAdminForms();
}

export default initAdminForms;
