/**
 * Validaciones simples para formularios de admin
 * - Busca formularios por selector (por defecto 'form')
 * - Valida password (mínimo 8) y que password === confirm_password
 * - Añade clase 'is-invalid' a inputs con errores y escribe mensaje en .validation-errors
 */
export type ValidacionesOptions = {
  selector?: string;
};

export function initFormValidations(options?: ValidacionesOptions): void {
  const { selector = 'form' } = options || {};

  const forms = Array.from(document.querySelectorAll(selector)).filter(
    (el): el is HTMLFormElement => el instanceof HTMLFormElement
  );

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      const pw = form.querySelector<HTMLInputElement>('input[name="password"]');
      const confirm = form.querySelector<HTMLInputElement>('input[name="confirm_password"]');
      let valid = true;

      // reset
      [pw, confirm].forEach((inp) => {
        if (!inp) return;
        inp.classList.remove('is-invalid');
      });

      if (pw && pw.value.length < 8) {
        pw.classList.add('is-invalid');
        valid = false;
      }

      if (pw && confirm && pw.value !== confirm.value) {
        confirm.classList.add('is-invalid');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
        const errRegion = form.querySelector<HTMLElement>('.validation-errors');
        if (errRegion) {
          errRegion.textContent = 'Corrige los errores marcados antes de continuar.';
        }
      }
    });
  });
}

export default initFormValidations;
