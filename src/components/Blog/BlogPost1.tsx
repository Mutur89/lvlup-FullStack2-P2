// src/components/blog/BlogPost1.tsx

const BlogPost1 = () => {
  return (
    <article>
      <h2 className="fw-bold text-center mb-4 text-success">
        Juegos de Mesa Modernos para Empezar Sin Gastar Demasiado
      </h2>
      
      <div className="row g-4 align-items-center mb-4">
        <div className="col-md-7">
          <p className="fs-5 mb-4 text-light">
            Si quieres comenzar en el mundo de los juegos de mesa modernos sin gastar demasiado, 
            hay una gran variedad de títulos ideales para dar el primer paso. Atrás quedaron los días 
            en que "jugar de mesa" era sinónimo solo de Monopoly o Uno. Hoy existe una enorme oferta 
            de juegos frescos, entretenidos y fáciles de aprender, con reglas que en pocos minutos 
            pueden hacer que cualquier reunión se transforme en una experiencia memorable.
          </p>
        </div>
        <div className="col-md-5 text-center">
          <div className="card bg-dark border-success mb-3">
            <img 
              src="https://i0.wp.com/la-matatena.com/wp-content/uploads/2016/11/912e9b5c3c4311e598faf23c91709c91_1438869660-e1480708531784.jpg?resize=600%2C343" 
              alt="Codenames" 
              className="card-img-top" 
              style={{ objectFit: 'contain', height: '300px' }}
            />
            <div className="card-body p-2">
              <h6 className="card-title fw-bold text-success mb-0">Codenames</h6>
              <span className="badge bg-success mb-2">≈$20.000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 align-items-center mb-4 flex-row-reverse">
        <div className="col-md-7">
          <p className="fs-5 mb-4 text-light">
            Entre los más recomendados para nuevos jugadores destacan títulos como{' '}
            <span className="text-success fw-bold">Codenames</span>, perfecto para jugar en equipos 
            y poner a prueba tu capacidad de asociación de palabras, y{' '}
            <span className="text-success fw-bold">Dixit</span>, un juego visual y narrativo que 
            despierta la imaginación con ilustraciones únicas.
          </p>
        </div>
        <div className="col-md-5 text-center">
          <div className="card bg-dark border-success mb-3">
            <img 
              src="https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2022/04/07/el-juego-de-mesa-dixit.jpeg" 
              alt="Dixit" 
              className="card-img-top" 
              style={{ objectFit: 'contain', height: '250px' }}
            />
            <div className="card-body p-2">
              <h6 className="card-title fw-bold text-success mb-0">Dixit</h6>
              <span className="badge bg-success mb-2">≈$45.000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 align-items-center mb-4">
        <div className="col-md-5 text-center">
          <div className="card bg-dark border-success mb-3">
            <img 
              src="https://i0.wp.com/misutmeeple.com/wp-content/uploads/2015/05/splendor_partida_preparada.jpg?resize=1200%2C549&ssl=1" 
              alt="Splendor" 
              className="card-img-top" 
              style={{ objectFit: 'contain', height: '250px' }}
            />
            <div className="card-body p-2">
              <h6 className="card-title fw-bold text-success mb-0">Splendor</h6>
              <span className="badge bg-success mb-2">≈$38.000</span>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <p className="fs-5 mb-4 text-light">
            También sobresalen <span className="text-success fw-bold">Splendor</span>, ideal para 
            quienes disfrutan de estrategias simples pero profundas, y{' '}
            <span className="text-success fw-bold">Kingdomino</span>, una versión moderna y rápida 
            de los clásicos juegos de construcción de reinos.
          </p>
        </div>
      </div>

      <div className="row g-4 align-items-center mb-4 flex-row-reverse">
        <div className="col-md-5 text-center">
          <div className="card bg-dark border-success mb-3">
            <img 
              src="https://2.blogs.elcomercio.pe/geekgames/wp-content/uploads/sites/57/2017/09/Kingdomino-Header.jpg" 
              alt="Kingdomino" 
              className="card-img-top" 
              style={{ objectFit: 'contain', height: '160px' }}
            />
            <div className="card-body p-2">
              <h6 className="card-title fw-bold text-success mb-0">Kingdomino</h6>
              <span className="badge bg-success mb-2">≈$25.000</span>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <p className="fs-5 mb-4 text-light">
            Si buscas juegos familiares o para compartir con amigos en ambientes más relajados, 
            opciones como <span className="text-info fw-bold">Sushi Go!</span>,{' '}
            <span className="text-info fw-bold">Love Letter</span> y{' '}
            <span className="text-info fw-bold">Hanabi</span> ofrecen partidas rápidas y muy 
            rejugables. En la misma línea, <span className="text-warning fw-bold">Carcassonne</span>{' '}
            y <span className="text-warning fw-bold">Ticket to Ride: New York</span> son versiones 
            más compactas de grandes clásicos que mantienen la esencia de la estrategia pero con 
            partidas que no superan los 30 minutos.
          </p>
        </div>
      </div>

      <div className="row g-4 align-items-center mb-4">
        <div className="col-md-7">
          <p className="fs-5 mb-4 text-light">
            Finalmente, <span className="text-primary fw-bold">Azul</span> se convierte en un 
            imprescindible gracias a su mezcla de belleza estética y sencillez en la mecánica. 
            Lo mejor de esta selección es que todos estos juegos se mantienen bajo los $50.000, 
            lo que los convierte en una excelente puerta de entrada al hobby. Además, la mayoría 
            ocupa poco espacio, se explica en minutos y puede disfrutarse tanto en familia como 
            con grupos de amigos. Con esta lista, armar tu primera ludoteca será sencillo, 
            entretenido y sin romper el bolsillo.
          </p>
        </div>
        <div className="col-md-5 text-center">
          <div className="card bg-dark border-success mb-3">
            <img 
              src="https://i0.wp.com/misutmeeple.com/wp-content/uploads/2017/12/azul_detalle_tablero.jpg?resize=1200%2C791&ssl=1" 
              alt="Azul" 
              className="card-img-top" 
              style={{ objectFit: 'contain', height: '160px', borderRadius: '5%' }}
            />
            <div className="card-body p-2">
              <h6 className="card-title fw-bold text-success mb-0">Azul</h6>
              <span className="badge bg-success mb-2">≈$40.000</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost1;