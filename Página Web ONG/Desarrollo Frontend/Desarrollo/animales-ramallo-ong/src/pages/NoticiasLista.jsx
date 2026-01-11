import { Link } from 'react-router-dom';

const NoticiasLista = () => {
  return (
    <>
      <section className="hero-noticias-section">
        <div className="hero-inner"><h1>Noticias</h1></div>
      </section>

      <section className="noticias-section">
        <div className="grid-noticias">
          {/* Noticia 1 */}
          <article className="card-noticia">
            <div className="card-img-container-noticias">
              <img src="/Imágenes/Noticias/Noticia 1.png" alt="Noticia 1" />
            </div>
            <div className="noticia-content">
              <p className="noticia-fecha">Marzo 15, 2025</p>
              <h3>Castraciones para perros y gatos</h3>
              <Link to="/noticias/noticia_1" className="btn-leer-noticias">Leer más</Link>
            </div>
          </article>
          {/* Noticia 2 */}
          <article className="card-noticia">
            <div className="card-img-container-noticias">
              <img src="/Imágenes/Noticias/Noticia 2.png" alt="Noticia 2" />
            </div>
            <div className="noticia-content">
              <p className="noticia-fecha">Abril 02, 2025</p>
              <h3>Jornada de adopción en la plaza</h3>
              <Link to="/noticias/noticia_2" className="btn-leer-noticias">Leer más</Link>
            </div>
          </article>
          {/* Noticia 3 */}
          <article className="card-noticia">
            <div className="card-img-container-noticias">
              <img src="/Imágenes/Noticias/Noticia 3.png" alt="Noticia 3" />
            </div>
            <div className="noticia-content">
              <p className="noticia-fecha">Abril 10, 2025</p>
              <h3>Convocatoria para nuevos voluntarios</h3>
              <Link to="/noticias/noticia_3" className="btn-leer-noticias">Leer más</Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};
export default NoticiasLista;