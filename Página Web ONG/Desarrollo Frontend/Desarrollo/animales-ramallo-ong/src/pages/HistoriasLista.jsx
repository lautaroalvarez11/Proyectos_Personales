import { Link } from 'react-router-dom';

const HistoriasLista = () => {
  return (
    <>
      <section className="hero-historias-section">
        <div className="hero-inner">
          <h1>Historias</h1>
        </div>
      </section>

      <section id="historias" className="historias-section">
        <div className="grid-historias">
          <article className="card-historias">
            <div className="card-img-container-historias">
              <Link to="/historias/sarni"><img src="/Imágenes/Historias/Sarni 1.png" alt="Sarni" /></Link>
            </div>
            <div className="historias-content">
              <h3>Conocé a Sarni</h3>
              <Link to="/historias/sarni" className="btn-leer-historias">Leer historia</Link>
            </div>
          </article>

          <article className="card-historias">
            <div className="card-img-container-historias">
              <Link to="/historias/scooby"><img src="/Imágenes/Historias/Scooby.png" alt="Scooby" /></Link>
            </div>
            <div className="historias-content">
              <h3>Conocé a Scooby</h3>
              <Link to="/historias/scooby" className="btn-leer-historias">Leer historia</Link>
            </div>
          </article>

          <article className="card-historias">
             <div className="card-img-container-historias">
               <Link to="/historias/dalila"><img src="/Imágenes/Historias/Dalila.png" alt="Dalila" /></Link>
             </div>
             <div className="historias-content">
               <h3>Conocé a Dalila</h3>
               <Link to="/historias/dalila" className="btn-leer-historias">Leer historia</Link>
             </div>
          </article>
        </div>
      </section>
    </>
  );
};
export default HistoriasLista;