import { Link } from 'react-router-dom';

const AdopcionesLista = () => {
  return (
    <>
      <section className="hero hero-adopciones">
        <div className="hero-inner hero-inner-adopciones">
          <div className="hero-dog-left">
            <img src="/Imágenes/Adopciones/Perro_Hero_Section_Adopciones_Izq.png" alt="Perro Izq" />
          </div>
          <div className="hero-content-center">
            <h1>Te ayudamos a agrandar tu familia</h1>
            <p>Cada animal espera una segunda oportunidad para dar amor, lealtad y alegría sin medida.
              Al adoptar, no solo transformás una vida, también agrandas tu familia con un compañero
              que te recordará cada día lo hermoso que es elegir con el corazón.
            </p>
            <a href="#integrantes" className="btn-contact">Comencemos</a>
          </div>
          <div className="hero-dog-right">
            <img src="/Imágenes/Adopciones/Perro_Hero_Section_Adopciones_Der.png" alt="Perro Der" />
          </div>
        </div>
      </section>

      <section id="integrantes" className="integrantes-section">
        <h2>Tu próximo/a integrante</h2>
        <div className="grid-adopcion">
          
          <article className="card-adopcion">
            <div className="card-img-container"><img src="/Imágenes/Adopciones/Simpa.jpg" alt="Simpa" /></div>
            <h3>Simpa</h3>
            <Link to="/adopciones/detalle/simpa" className="btn-conoce">Conocé mi historia</Link>
          </article>

          <article className="card-adopcion">
            <div className="card-img-container"><img src="/Imágenes/Adopciones/Juana.jpg" alt="Juana" /></div>
            <h3>Juana</h3>
            <Link to="/adopciones/detalle/juana" className="btn-conoce">Conocé mi historia</Link>
          </article>

          <article className="card-adopcion">
            <div className="card-img-container"><img src="/Imágenes/Adopciones/Maddie.jpg" alt="Maddie" /></div>
            <h3>Maddie</h3>
            <Link to="/adopciones/detalle/maddie" className="btn-conoce">Conocé mi historia</Link>
          </article>

        </div>
      </section>
    </>
  );
};
export default AdopcionesLista;