// src/pages/client/Blog.tsx
import { useState } from 'react';
import BlogPost1 from '../../components/blog/BlogPost1';
import BlogPost2 from '../../components/blog/BlogPost2';

const Blog = () => {
  const [activePost, setActivePost] = useState<1 | 2>(1);

  return (
    <main>
      {/* Controles de selección */}
      <div className="container py-4">
        <div className="d-flex gap-2 justify-content-center mb-3">
          <button
            className={`btn ${activePost === 1 ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setActivePost(1)}
            aria-pressed={activePost === 1}
          >
            Juegos de Mesa
          </button>
          <button
            className={`btn ${activePost === 2 ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setActivePost(2)}
            aria-pressed={activePost === 2}
          >
            PC Gamer Económico
          </button>
        </div>
      </div>

      {/* Contenedor del artículo */}
      <section className="py-5">
        <div className="container">
          <div 
            className="bg-black rounded shadow p-4 border border-success"
            style={{ minHeight: '200px' }}
          >
            {activePost === 1 ? <BlogPost1 /> : <BlogPost2 />}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;