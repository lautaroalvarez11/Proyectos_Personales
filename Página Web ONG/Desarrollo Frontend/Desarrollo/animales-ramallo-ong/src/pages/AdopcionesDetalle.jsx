import { useEffect } from 'react'; // IMPORTAR useEffect
import { useParams, Link } from 'react-router-dom';
import { animalesData } from '../data/db';

const AdopcionDetalle = () => {
  const { id } = useParams();
  const animal = animalesData[id];

  // AGREGAR ESTO: Fuerza el scroll arriba al cargar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <section className="infoAnimal-section">
        <div className="hero-inner">
            <div className="animal-info">
              <h2>{animal.nombre}</h2>
              <div dangerouslySetInnerHTML={{ __html: animal.descripcion }} />
              <div className="btn-ayuda-container">
                <Link to={`/adopciones/formulario/${id}`} className="btn-ayuda">¡Adopto!</Link>
               </div>
            </div>
        </div>
      </section>

      <section className="animal-gallery-section">
        <div className="animal-gallery-grid">
          {animal.galeria.map((imgSrc, index) => (
             <div key={index} className="gallery-img-container">
               <img src={imgSrc} alt={`Foto ${index}`} />
             </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default AdopcionDetalle;