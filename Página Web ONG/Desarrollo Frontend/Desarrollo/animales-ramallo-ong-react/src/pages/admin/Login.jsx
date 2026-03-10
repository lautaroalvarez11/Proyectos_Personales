import React, { useState } from 'react';
import '../../assets/css/login.css';

const Login = () => {
  // Estados para guardar lo que escribe el usuario
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentando ingresar con:", usuario, password);
    // Acá conectar con el Backend
    alert('Funcionalidad de login en construcción');
  };

  return (
    <div className="login-page">
      {/* Contenedor central */}
      <div className="login-container">
        
        {/* 1. Logo de la ONG */}
        <div className="login-logo-wrapper">
            <img src="/Imágenes/Logo_ONG.jpg" alt="Animales Ramallo Logo" />
        </div>

        {/* 2. Tarjeta Roja/Naranja */}
        <div className="login-card">
          <h2>Inicio de sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="usuario">Usuario</label>
              <input 
                type="text" 
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Usuario" 
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Contraseña</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
            </div>

            <button type="submit" className="btn-ingresar">
              Ingresar
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;