// src/pages/client/Nosotros.tsx

const Nosotros = () => {
  return (
    <main className="container py-5">
      {/* SECTION */}
      <section className="row justify-content-center">
        <div className="col-md-8">
          {/* ARTICLE */}
          <article className="card shadow-sm p-4">
            <h2 className="fw-bold mb-3 text-dark">¿Quiénes somos?</h2>
            <p className="lead mb-4">
              Somos una compañía <strong>100% online</strong> conformada por{' '}
              <strong>Carlos</strong> y <strong>Simón</strong>, jóvenes de Valparaíso 
              apasionados por el mundo gamer. Nuestra misión es ofrecerte los mejores 
              productos gamer, tanto virtuales como físicos, junto a todos los accesorios 
              e implementos necesarios para que tus días de diversión sean cada vez mejores.
            </p>
            <p>
              En Level-Up Gamer encontrarás una selección de consolas, videojuegos, 
              accesorios, merchandising y mucho más, todo pensado para la comunidad gamer 
              de Chile. Nos esforzamos por brindar atención personalizada, envíos rápidos 
              y productos de calidad para que vivas la mejor experiencia posible.
            </p>
            <hr />
            <p className="mb-0 text-secondary">
              ¡Gracias por confiar en nosotros y ser parte de nuestra comunidad!
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Nosotros;