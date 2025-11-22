import React from 'react';

export default function App(){
  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="logo"><img src="/logo.png" alt="Logo"/></a>
          <nav className="main-nav">
            <ul>
              <li><a href="/" className="active">Inicio</a></li>
              <li><a href="/adopciones">Adopciones</a></li>
              <li><a href="/noticias">Noticias</a></li>
              <li><a href="/historias">Historias</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <a href="#" className="btn-donar">DONAR AQUÍ</a>
          </div>
        </div>
      </header>

      <section className="hero" style={{backgroundImage: `url('/hero.jpg')`}}>
        <div className="hero-inner">
          <div className="hero-left">
            <h1>Adoptá amor, salvá vidas</h1>
            <p className="hero-sub">Cada adopción es una segunda oportunidad. Elegí cambiar una historia: no compres, adoptá. Juntos podemos construir un futuro con más empatía, respeto y corazones felices.</p>
            <a href="/contacto" className="btn-primary">Contáctanos</a>
          </div>
          <div className="hero-right">
            <img src="/dog-right.png" alt="Perro" />
          </div>
        </div>
      </section>

      <main className="main">
        <section className="about">
          <h2>Un poco sobre nosotros</h2>
          <div className="cards">
            <article className="card">
              <div className="card-icon"><img src="/icon1.png" alt=""/></div>
              <h3>¿A qué nos dedicamos?</h3>
              <p>Somos una ONG destinada al rescate y recuperación de animales en situación de calle.</p>
            </article>
            <article className="card">
              <div className="card-icon"><img src="/icon2.png" alt=""/></div>
              <h3>¿Dónde nos encontrás?</h3>
              <p>Somos de la ciudad de Ramallo, provincia de Buenos Aires.</p>
            </article>
            <article className="card">
              <div className="card-icon"><img src="/icon3.png" alt=""/></div>
              <h3>Colaborá con nosotros</h3>
              <p>Podés ayudarnos a seguir cambiando vidas haciendo clic en el siguiente botón.</p>
              <a href="#" className="btn-donar small">DONAR AQUÍ</a>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p>Copyright © 2025 Animales Ramallo | Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}
