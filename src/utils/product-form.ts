/**
 * product-form.ts
 * Comportamiento cliente para el formulario de administración de productos:
 * - Validación de precio
 * - Previsualización de imagen y validaciones sobre tipo/tamaño
 * - Muestra mensajes en .validation-errors
 */
export type ProductFormOptions = {
  formSelector?: string;
  precioSelector?: string;
  imagenInputSelector?: string;
  previewSelector?: string;
  errorsSelector?: string;
  maxImageBytes?: number;
};

export function initProductForm(options?: ProductFormOptions): void {
  const {
    formSelector = '#product-form',
    precioSelector = '#precio',
    imagenInputSelector = '#imagenFile',
    previewSelector = '#imagenPreview',
    errorsSelector = '.validation-errors',
    maxImageBytes = 2 * 1024 * 1024,
  } = options || {};

  const form = document.querySelector<HTMLFormElement>(formSelector);
  if (!form) return;

  const precio = form.querySelector<HTMLInputElement>(precioSelector) || null;
  const imagenInput = form.querySelector<HTMLInputElement>(imagenInputSelector) || null;
  const preview = form.querySelector<HTMLImageElement>(previewSelector) || null;
  const errors = form.querySelector<HTMLElement>(errorsSelector) || null;

  function setError(msg: string) {
    if (!errors) return;
    errors.textContent = msg;
    errors.style.display = msg ? 'block' : 'none';
  }

  // Image preview
  if (imagenInput && preview) {
    imagenInput.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (!file) {
        preview.src = '';
        preview.style.display = 'none';
        return;
      }
      if (!file.type || !file.type.startsWith('image/')) {
        setError('El archivo debe ser una imagen.');
        imagenInput.value = '';
        return;
      }
      if (file.size > maxImageBytes) {
        setError('La imagen debe pesar menos de 2 MB.');
        imagenInput.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        // reader.result puede ser string o ArrayBuffer
        if (typeof reader.result === 'string') {
          preview.src = reader.result;
          preview.style.display = 'block';
          setError('');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Validate on submit
  form.addEventListener('submit', (evt) => {
    let valid = true;
    setError('');
    if (precio) {
      const v = parseFloat(precio.value as string);
      if (Number.isNaN(v) || v < 0) {
        setError('Ingrese un precio válido (>= 0).');
        valid = false;
      }
    }
    // image optional but if present must be an image
    if (imagenInput && imagenInput.files && imagenInput.files[0]) {
      const f = imagenInput.files[0];
      if (!f.type || !f.type.startsWith('image/')) {
        setError('El archivo debe ser una imagen.');
        valid = false;
      }
      if (f.size > maxImageBytes) {
        setError('La imagen debe pesar menos de 2 MB.');
        valid = false;
      }
    }
    if (!valid) evt.preventDefault();
  });
}

// Auto-inicializar en DOMContentLoaded (mantiene comportamiento del JS original)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initProductForm());
} else {
  initProductForm();
}

export default initProductForm;
