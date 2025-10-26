export const comunasPorRegion: Record<string, string[]> = {
  I: ["Iquique", "Alto Hospicio", "Pozo Almonte"],
  II: ["Antofagasta", "Calama", "Tocopilla"],
  III: ["Copiapó", "Vallenar", "Chañaral"],
  IV: ["La Serena", "Coquimbo", "Ovalle"],
  V: ["Valparaíso", "Viña del Mar", "Quillota"],
  VI: ["Rancagua", "San Fernando", "Santa Cruz"],
  VII: ["Talca", "Curicó", "Linares"],
  VIII: ["Concepción", "Los Ángeles", "Chillán Viejo"],
  IX: ["Temuco", "Villarrica", "Angol"],
  X: ["Puerto Montt", "Osorno", "Castro"],
  XI: ["Coyhaique", "Aysén", "Chile Chico"],
  XII: ["Punta Arenas", "Puerto Natales", "Porvenir"],
  RM: ["Santiago", "Las Condes", "Maipú", "Puente Alto"],
  XIV: ["Valdivia", "La Unión", "Panguipulli"],
  XV: ["Arica", "Putre", "Camarones"],
  XVI: ["Chillán", "San Carlos", "Bulnes"],
};

export type ComunasOptions = {
  regionSelectId?: string;
  comunaSelectId?: string;
  defaultOptionText?: string;
};

export function initComunas(options?: ComunasOptions): void {
  const { regionSelectId = 'region', comunaSelectId = 'comuna', defaultOptionText = 'Seleccione la comuna...' } = options || {};

  const regionSelect = document.getElementById(regionSelectId) as HTMLSelectElement | null;
  const comunaSelect = document.getElementById(comunaSelectId) as HTMLSelectElement | null;

  if (!regionSelect) {
    console.warn(`initComunas: elemento #${regionSelectId} no encontrado.`);
    return;
  }
  if (!comunaSelect) {
    console.warn(`initComunas: elemento #${comunaSelectId} no encontrado.`);
    return;
  }

  const comunaSelectEl = comunaSelect as HTMLSelectElement;
  const regionSelectEl = regionSelect as HTMLSelectElement;

  function populateComunas(regionKey: string | null) {
    comunaSelectEl.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.selected = true;
    placeholder.disabled = true;
    placeholder.textContent = defaultOptionText;
    comunaSelectEl.appendChild(placeholder);

    if (!regionKey) return;
    const lista = comunasPorRegion[regionKey];
    if (!lista) return;
    lista.forEach((comuna) => {
      const option = document.createElement('option');
      option.value = comuna;
      option.textContent = comuna;
      comunaSelectEl.appendChild(option);
    });
  }

  // Inicializar con el valor actual
  populateComunas(regionSelectEl.value || null);

  regionSelectEl.addEventListener('change', function () {
    populateComunas((this as HTMLSelectElement).value || null);
  });
}

// Auto-inicializar si el DOM ya está cargado o cuando lo esté
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initComunas());
} else {
  initComunas();
}

export default initComunas;
