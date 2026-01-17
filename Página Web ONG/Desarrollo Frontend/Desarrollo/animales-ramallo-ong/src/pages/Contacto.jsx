const Contacto = () => {
  return (
    <>
      <section className="hero-contacto-section">
        <div className="hero-inner">
          <h1>Contacto</h1>
        </div>
      </section>

      <section className="contacto-layout">
        <div className="contacto-main-container">
          {/* INFO */}
          <div className="columna-info">
            <div className="intro-text">
              <h2>¿Cómo contactarnos?</h2>
              <p>Si querés sumarte, adoptar, colaborar o simplemente conocer más sobre nuestro trabajo, podés comunicarte con nosotros.</p>
              <p>Cada mensaje, consulta o aporte nos ayuda a seguir cambiando vidas.</p>
            </div>
            <div className="contact-cards-container">
              <div className="contact-card">
                <div className="icon-box">
                   <img src="/Imágenes/Contacto/Arroba.png" alt="@" />
                </div>
                <div className="card-text">
                  <h4>Email:</h4>
                  <p>emailanimalesramallo@gmail.com</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="icon-box">
                  <img src="/Imágenes/Contacto/Teléfono.png" alt="Tel" />
                </div>
                <div className="card-text">
                  <h4>Teléfono:</h4>
                  <p>123 4567890</p>
                </div>
              </div>
            </div>
            <div className="social-location-container">
                <a href="https://www.instagram.com/onganimalesramallo/" target="_blank" className="social-item"><img src="/Imágenes/Contacto/Instagram.png" alt="IG" /></a>
                <a href="https://www.facebook.com/maria.ayuda.56/?locale=es_LA" target="_blank" className="social-item"><img src="/Imágenes/Contacto/Facebook.png" alt="FB" /></a>
                <a href="https://www.google.com/maps/place/ramallo+buenos+aires/data=!4m2!3m1!1s0x95b9fca2f74ad067:0xf54b5dc7d1ce475a?sa=X&ved=1t:155783&ictx=111" className="social-item location-item" target="_blank">
                  <img src="/Imágenes/Contacto/Ubicación.png" alt="Pin" />
                  <span className="location-text">Ramallo, Provincia de Buenos Aires</span>
                </a>
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="columna-form">
            <div className="form-box-border"> 
              <form action="#" method="POST" className="contacto-form">
                <div className="form-row">
                  <div className="form-group"><input type="text" name="nombre" placeholder="Nombre" required /></div>
                  <div className="form-group"><input type="text" name="apellido" placeholder="Apellido" required /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><input type="email" name="email" placeholder="Email" required /></div>
                  <div className="form-group"><input type="tel" name="telefono" placeholder="Teléfono" required /></div>
                </div>
                <div className="form-group full-width">
                  <textarea name="mensaje" placeholder="Mensaje"></textarea>
                </div>
                <button type="submit" className="btn-enviar-contacto">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Contacto;