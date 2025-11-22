// js/main.js
document.addEventListener('DOMContentLoaded', function(){
  // MENU HAMBURGER - toggle nav on small screens
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');

  hamburger && hamburger.addEventListener('click', function(){
    if (mainNav.style.display === 'block') {
      mainNav.style.display = 'none';
      this.setAttribute('aria-expanded','false');
    } else {
      mainNav.style.display = 'block';
      this.setAttribute('aria-expanded','true');
    }
  });

  // DONATION BUTTON - ejemplo: abrir link de MercadoPago (reemplazar '#')
  const donar = document.getElementById('donar-btn');
  if (donar) {
    donar.addEventListener('click', function(e){
      const link = this.getAttribute('href');
      // Si no definiste link, mostramos aviso. En producción cambiá el href por el link de Mercado Pago.
      if (!link || link === '#') {
        e.preventDefault();
        window.location.href = '#contacto'; // o mostrar modal
        return;
      }
      // si ya tiene href válido, se seguirá la redirección natural
    });
  }

  // Cerrar menu al redimensionar a escritorio
  window.addEventListener('resize', function(){
    if (window.innerWidth > 900 && mainNav) {
      mainNav.style.display = 'flex';
    } else if (window.innerWidth <= 900 && mainNav) {
      mainNav.style.display = 'none';
    }
  });
});
