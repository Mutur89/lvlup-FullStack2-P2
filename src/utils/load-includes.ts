

export type LoadIncludesOptions = {
  bootstrapCss?: string;
  bootstrapBundle?: string;
  styleRelPath?: string; 
};

export function initLoadIncludes(options?: LoadIncludesOptions): void {
  const {
    bootstrapCss = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    bootstrapBundle = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    styleRelPath = '../src/styles/style.css',
  } = options || {};

 
  const currentScript = (document.currentScript as HTMLScriptElement | null) || ((): HTMLScriptElement | null => {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1] as HTMLScriptElement | null;
  })();
  const scriptSrc = currentScript && currentScript.src ? currentScript.src : window.location.href;

 
  const resolve = (rel: string) => new URL(rel, scriptSrc).href;

  // Inyecta CSS/JS comunes si no están presentes
  function ensureCSS(href: string) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      document.head && document.head.appendChild(l);
    }
  }
  function ensureScript(src: string, attrs?: Record<string, any>) {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src;
      if (attrs) Object.assign(s, attrs);
      document.body && document.body.appendChild(s);
    }
  }

 
  ensureCSS(bootstrapCss);
  ensureCSS(resolve(styleRelPath));


  async function loadFragment(selector: string, path: string) {
    try {
      const res = await fetch(path, { cache: 'no-cache' });
      if (!res.ok) return;
      const html = await res.text();
      const container = document.querySelector(selector);
      if (container) container.innerHTML = html;
    } catch (e) {
  
      console.error('loadFragment error', e);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Lugar donde se inyecta header/footer y fragmentos admin
    loadFragment('#include-header', resolve('header.html'));
    loadFragment('#include-footer', resolve('footer.html'));
    // Admin specific includes (if present)
    loadFragment('#include-admin-sidebar', resolve('admin-sidebar.html'));
    loadFragment('#include-admin-footer', resolve('admin-footer.html'));

    // Asegurar bootstrap bundle si no existe (para collapse, dropdowns, carousel)
    ensureScript(bootstrapBundle);
  });
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initLoadIncludes());
} else {
  initLoadIncludes();
}

export default initLoadIncludes;
