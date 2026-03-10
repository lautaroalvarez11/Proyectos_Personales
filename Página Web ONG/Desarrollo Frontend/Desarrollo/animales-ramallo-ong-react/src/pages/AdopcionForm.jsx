import { useParams } from 'react-router-dom';
import { animalesData } from '../data/db';

const AdopcionForm = () => {
  const { id } = useParams();
  const animal = animalesData[id] || animalesData['juana'];

  return (
    <>
      <section className="hero-formulario-section">
        <div className="hero-inner">
          <h1>Formulario de contacto</h1>
        </div>
      </section>

      <section className="form-container-section">
        <div className="form-inner">
          <div className="form-wrapper">
            <form action="#" method="POST" className="adopcion-form">
              <div className="form-raw">
                <div className="form-group"><input type="text" placeholder="Nombre y apellido" required /></div>
              </div>
              <div className="form-group"><input type="tel" placeholder="Teléfono" required /></div>
              <div className="form-group"><input type="email" placeholder="Email" required /></div>
              <div className="form-group"><input type="text" placeholder="Dirección" required /></div>
              <div className="form-group"><textarea placeholder="Mensaje opcional"></textarea></div>
              
              <p className="form-aclaracion">
                <strong>IMPORTANTE:</strong> Estos datos son para ponernos en contacto con usted y permitirle
                tener una atención personalizada sobre el proceso de adopción de {animal.nombre.replace('Te presentamos a ', '')}.<br />
                ¡Muchas gracias por su tiempo y esperemos haber sido partícipes de una hermosa historia de amor!
              </p>
              <button type="submit" className="btn-enviar">Enviar</button>
            </form>
          </div>
          <div className="form-image-wrapper">
            <img src={animal.imagenPrincipal} alt="Animal" />
          </div>
        </div>
      </section>
    </>
  );
};
export default AdopcionForm;