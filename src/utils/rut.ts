

/** Limpia un RUT/RUN: remueve todo excepto dígitos y 'K' y lo deja en mayúsculas */
export function cleanRut(rut: string): string {
  if (!rut) return '';
  return rut.replace(/[^0-9kK]/g, '').toUpperCase();
}

/**
 * Valida un RUT/RUN chileno usando el algoritmo de módulo 11.
 * Acepta formatos con o sin puntos/guión, y 'K' o 'k' como dígito verificador.
 */
export function validateRut(rut: string): boolean {
  const cleaned = cleanRut(rut);
  if (!cleaned) return false;
  if (cleaned.length < 2) return false;

  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);


  if (!/^[0-9]+$/.test(body)) return false;

  let sum = 0;
  let mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }

  const mod = sum % 11;
  const res = 11 - mod;
  const dvEsperado = res === 11 ? '0' : res === 10 ? 'K' : String(res);

  return dvEsperado === dv.toUpperCase();
}

/**
 * Formatea un RUT en la forma 12.345.678-5. Si la entrada no es válida
 * devuelve la cadena limpia (sin puntos/guión) o cadena vacía.
 */
export function formatRut(rut: string): string {
  const cleaned = cleanRut(rut);
  if (!cleaned) return '';
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);

  // Insertar puntos cada 3 dígitos desde la derecha
  const withDots = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${withDots}-${dv}`;
}

export default {
  cleanRut,
  validateRut,
  formatRut,
};
