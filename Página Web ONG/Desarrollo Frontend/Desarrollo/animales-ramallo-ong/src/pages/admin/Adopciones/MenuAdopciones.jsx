import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css'; 

const MenuAdopciones = () => {
  return (
    <div className="panel-page">
      {/* Encabezado */}
      <header className="panel-header">
        <h1>Administrar Adopciones</h1>
      </header>

      <div className="panel-container">
        <div className="panel-grid-tarjetas">
          
          {/* Tarjeta 1: Alta */}
          <Link to="/admin/adopciones/alta" className="panel-card">
            <span className="panel-card-text">Alta<br/>Adopción</span>
          </Link>

          {/* Tarjeta 2: Modificar */}
          <Link to="/admin/adopciones/modificar" className="panel-card">
            <span className="panel-card-text">Modificar<br/>Adopción</span>
          </Link>

          {/* Tarjeta 3: Baja */}
          <Link to="/admin/adopciones/baja" className="panel-card">
            <span className="panel-card-text">Baja<br/>Adopción</span>
          </Link>

          {/* Tarjeta Extra: Volver al Panel Principal */}
          <Link to="/admin" className="panel-card-salir">
            <span className="panel-card-salir-text">Volver al<br/>Panel</span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default MenuAdopciones;