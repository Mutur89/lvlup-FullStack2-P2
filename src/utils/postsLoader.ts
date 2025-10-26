export type PostsLoaderOptions = {
  containerId?: string;
  btn1Id?: string;
  btn2Id?: string;
  postsPath?: (n: number) => string;
  fadeDurationMs?: number;
};

export function initPostsLoader(options?: PostsLoaderOptions): void {
  const {
    containerId = 'articleContainer',
    btn1Id = 'btnPost1',
    btn2Id = 'btnPost2',
    postsPath = (n: number) => `posts/post${n}.html`,
    fadeDurationMs = 180,
  } = options || {};

  const container = document.getElementById(containerId);
  const btn1 = document.getElementById(btn1Id);
  const btn2 = document.getElementById(btn2Id);

  if (!container) {
    console.warn(`PostsLoader: contenedor "${containerId}" no encontrado.`);
    return;
  }
  if (!btn1 || !btn2) {
    console.warn(`PostsLoader: botones "${btn1Id}" o "${btn2Id}" no encontrados.`);
    return;
  }

  const containerEl = container as HTMLElement;
  const btn1El = btn1 as HTMLElement;
  const btn2El = btn2 as HTMLElement;

  function setActiveButton(n: number) {
    if (!btn1 || !btn2) return;
    if (n === 1) {
      btn1.classList.remove('btn-outline-success');
      btn1.classList.add('btn-success');
      btn1.setAttribute('aria-pressed', 'true');

      btn2.classList.remove('btn-success');
      btn2.classList.add('btn-outline-success');
      btn2.setAttribute('aria-pressed', 'false');
    } else {
      btn2.classList.remove('btn-outline-success');
      btn2.classList.add('btn-success');
      btn2.setAttribute('aria-pressed', 'true');

      btn1.classList.remove('btn-success');
      btn1.classList.add('btn-outline-success');
      btn1.setAttribute('aria-pressed', 'false');
    }
  }

  async function loadPost(n: number) {
    const path = postsPath(n);
    try {
      // Fade out
    containerEl.style.opacity = '0';
      const res = await fetch(path, { cache: 'no-cache' });
      if (!res.ok) throw new Error('No se pudo cargar el post');
      const html = await res.text();
      // Small delay to allow fade-out
      setTimeout(() => {
        containerEl.innerHTML = html;
        containerEl.style.opacity = '1';
        setActiveButton(n);
        try {
          history.replaceState(null, '', `?post=${n}`);
        } catch (e) {
          // ignore history errors on some environments
        }
      }, fadeDurationMs);
    } catch (err) {
  containerEl.innerHTML = '<div class="text-danger">Error al cargar el contenido. Intenta recargar la página.</div>';
  containerEl.style.opacity = '1';
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  // Leer parámetro post de la URL
  const params = new URLSearchParams(window.location.search);
  const postParam = parseInt(params.get('post') || '', 10);
  loadPost(postParam === 2 ? 2 : 1);

  btn1El.addEventListener('click', () => loadPost(1));
  btn2El.addEventListener('click', () => loadPost(2));
}

// Auto-initialize similarly to original script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initPostsLoader());
} else {
  initPostsLoader();
}

export default initPostsLoader;
