// src/components/blog/BlogPost2.tsx

const BlogPost2 = () => {
  return (
    <article>
      <h2 className="fw-bold text-center mb-4 text-success">
        ¿Cómo Armar un PC Gamer Económico en Chile?
      </h2>
      
      <p className="fs-5 mb-4 text-light">
        Armar un PC gamer económico en Chile es posible sin superar los{' '}
        <span className="fw-bold text-success">$500.000</span>, siempre que se escojan componentes 
        equilibrados y con buena relación precio-rendimiento. Una excelente opción es comenzar con 
        el <span className="fw-bold text-success">AMD Ryzen 5 5600</span>, un procesador de 6 núcleos 
        con gran desempeño en juegos y multitarea, junto a una placa base{' '}
        <span className="fw-bold text-success">B450M</span> o{' '}
        <span className="fw-bold text-success">B550M</span>, que ofrece estabilidad y posibilidades 
        de expansión para futuro.
      </p>

      <div className="row mb-4">
        <div className="col-12 text-center">
          <img 
            src="https://i.ytimg.com/vi/p0q5TQkqN-Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDKN4KxA4BMLzpkrdvJx5yqMAcfpQ" 
            alt="PC Gamer Económico" 
            className="img-fluid rounded border border-success mb-3" 
            style={{ objectFit: 'cover', height: '220px', maxWidth: '100%' }}
          />
        </div>
      </div>

      <div className="row g-4 align-items-center mb-4">
        <div className="col-md-5 text-center">
          <img 
            src="https://i.ytimg.com/vi/XCpfjcL9GAk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAqQn0ZHOqi8kga4IrsKtz5HOQcSQ" 
            alt="PC Gamer Alternativo" 
            className="img-fluid rounded border border-success mb-3" 
            style={{ objectFit: 'cover', height: '220px', maxWidth: '100%' }}
          />
        </div>
        <div className="col-md-7">
          <p className="fs-5 mb-4 text-light">
            En cuanto a gráfica, la <span className="fw-bold text-success">Radeon RX 6600</span> se 
            posiciona como la mejor alternativa budget para jugar en 1080p con calidad alta, mientras 
            que <span className="fw-bold text-success">16GB de RAM DDR4</span> (2x8GB, 3200MHz) 
            aseguran fluidez en prácticamente todos los títulos modernos. Para almacenamiento, un{' '}
            <span className="fw-bold text-success">SSD NVMe de 500GB</span> es suficiente para el 
            sistema operativo y varios juegos, con espacio para ampliaciones más adelante. El 
            complemento ideal es un gabinete con fuente certificada de 500-600W, que entrega una 
            buena base en refrigeración y seguridad energética.
          </p>
        </div>
      </div>

      <div className="row g-4 align-items-center mb-4">
        <div className="col-12">
          <h4 className="fw-bold mb-3 text-success text-center">
            Desglose de Componentes y Precios
          </h4>
          <div className="table-responsive">
            <table className="table table-dark table-bordered border-success align-middle">
              <thead>
                <tr className="text-success text-center">
                  <th>Componente</th>
                  <th>Modelo recomendado</th>
                  <th>Precio promedio</th>
                  <th>Alternativa más barata</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CPU</td>
                  <td>AMD Ryzen 5 5600</td>
                  <td>$140.000</td>
                  <td>Ryzen 5 3600 ($110.000)</td>
                </tr>
                <tr>
                  <td>Placa Madre</td>
                  <td>B450M / B550M</td>
                  <td>$75.000</td>
                  <td>A320M ($55.000)</td>
                </tr>
                <tr>
                  <td>GPU</td>
                  <td>Radeon RX 6600</td>
                  <td>$210.000</td>
                  <td>GTX 1660 Super ($170.000)</td>
                </tr>
                <tr>
                  <td>RAM</td>
                  <td>16GB DDR4 (2x8GB, 3200MHz)</td>
                  <td>$55.000</td>
                  <td>8GB DDR4 (1x8GB, 3200MHz) ($28.000)</td>
                </tr>
                <tr>
                  <td>Almacenamiento</td>
                  <td>SSD NVMe 500GB</td>
                  <td>$30.000</td>
                  <td>SSD SATA 480GB ($25.000)</td>
                </tr>
                <tr>
                  <td>Gabinete+Fuente</td>
                  <td>Mid Tower + 500W 80+</td>
                  <td>$35.000</td>
                  <td>Gabinete básico + fuente genérica ($25.000)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row g-4 align-items-center mb-4">
        <div className="col-12">
          <p className="fs-5 mb-4 text-light text-center">
            Como ves, con una selección inteligente puedes armar un PC gamer capaz de correr la 
            mayoría de los títulos actuales sin romper el bolsillo. Si necesitas ajustar aún más 
            el presupuesto, puedes optar por las alternativas más baratas de la tabla y dejar 
            espacio para futuras actualizaciones.
          </p>
        </div>
      </div>
    </article>
  );
};

export default BlogPost2;