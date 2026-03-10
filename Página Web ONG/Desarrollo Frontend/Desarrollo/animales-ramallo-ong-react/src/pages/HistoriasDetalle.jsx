import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { historiasData } from '../data/db';

const HistoriasDetalle = () => {
  const { id } = useParams();
  const data = historiasData[id];

  useEffect(() => { window.scrollTo(0, 0); }, [id]); // Scroll arriba

  if (!data) return <div style={{textAlign:'center', padding:'50px'}}>Historia no encontrada</div>;

  return (
    <>
      {/* HERO FALTANTE AGREGADO */}
      <section className="hero-historias-section">
        <div className="hero-inner">
          <h1>Historias</h1>
        </div>
      </section>

      <section className="detalle-historias-section">
        <div className="layout-historias-inner">
          <article className="historias-principal-content">
            <div className="historias-header-block">
              <h2>{data.titulo}</h2>
            </div>
            <div className="historias-cuerpo-texto" dangerouslySetInnerHTML={{ __html: data.cuerpo }} />
          
            <div className="historias-gallery-grid">
              {data.imagenes.map((img, i) => (
                <div key={i} className="historias-img-item"><img src={img} alt={`Foto ${i}`} /></div>
              ))}
            </div>
          
            <div className="historias-action-area">
              <Link to="/historias" className="btn-volver">Volver a Historias</Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};
export default HistoriasDetalle;