import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { noticiasData } from '../data/db';

const NoticiaDetalle = () => {
  const { id } = useParams();
  const data = noticiasData[id];

  useEffect(() => { window.scrollTo(0, 0); }, [id]); // Scroll arriba

  if (!data) return <div>Noticia no encontrada</div>;

  return (
    <>
      <section className="hero-noticias-section">
        <div className="hero-inner">
          <h1>Noticias</h1>
        </div>
      </section>

      <section className="detalle-noticia-section">
        <div className="layout-noticia-inner">
          {/* CONTENIDO IZQUIERDA */}
          <article className="noticia-principal-content">
            <div className="detalle-img-full">
              <img src={data.imagen} alt={data.titulo} />
            </div>
            <div className="noticia-header-block">
              <h2>{data.titulo}</h2>
              <p className="detalle-fecha">{data.fecha}</p>
            </div>
            <div className="noticia-cuerpo-texto" dangerouslySetInnerHTML={{ __html: data.cuerpo }} />
            <div className="noticia-action-area">
              <Link to="/noticias" className="btn-volver">Volver a Noticias</Link>
            </div>
          </article>

          {/* SIDEBAR DERECHA */}
          <aside className="sidebar-noticias">
            <h3 className="sidebar-title">Noticias Recientes</h3>
            <div className="lista-recientes">
              {Object.keys(noticiasData).map((key) => {
                // No mostramos la noticia actual en el sidebar
                if(key === id) return null;
                const item = noticiasData[key];
                return (
                  <Link to={`/noticias/${key}`} key={key} className="card-reciente-link">
                    <article className="card-reciente">
                      <div className="reciente-img"><img src={item.imagen} alt="Miniatura" /></div>
                      <div className="reciente-info">
                         <h4>{item.titulo}</h4>
                        <span className="leer-mas-small">Leer más &rarr;</span>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};
export default NoticiaDetalle;