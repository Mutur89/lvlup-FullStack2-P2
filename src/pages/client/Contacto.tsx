// src/pages/client/Contacto.tsx

const Contacto = () => {
  return (
    <main>
      <section 
        className="container d-flex flex-column align-items-center justify-content-center" 
        style={{ minHeight: '80vh', paddingTop: '40px', paddingBottom: '60px' }}
      >
        <img 
          src="/logo-lvlup.png" 
          alt="Level-Up Gamer Logo" 
          width="120" 
          height="120" 
          className="mb-3 mt-4" 
        />
        <h2 className="fw-bold text-success mb-4 text-center">Level-Up Gamer</h2>
        
        {/* Card con el formulario de contacto */}
        <article 
          className="card bg-dark text-light shadow-lg p-4 mb-10" 
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <h5 className="fw-bold mb-3 text-success text-center">FORMULARIO DE CONTACTO</h5>
          
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">NOMBRE COMPLETO</label>
              <input 
                type="text" 
                className="form-control bg-dark text-light border-secondary" 
                id="nombre" 
                required 
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">CORREO</label>
              <input 
                type="email" 
                className="form-control bg-dark text-light border-secondary" 
                id="correo" 
                required 
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">MENSAJE</label>
              <textarea 
                className="form-control bg-dark text-light border-secondary" 
                id="mensaje" 
                rows={4} 
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-dark w-100 mt-2">
              ENVIAR MENSAJE
            </button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Contacto;