import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const BajaAdopcion = () => {
  const [animalSeleccionado, setAnimalSeleccionado] = useState('');
  
  // Estados para datos del adoptante
  const [nombreAdoptante, setNombreAdoptante] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [datosAdicionales, setDatosAdicionales] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!animalSeleccionado) {
      alert('Por favor seleccione un animal.');
      return;
    }
    // Acá va la lógica para enviar los datos al backend
    alert(`Adopción registrada para ${animalSeleccionado}. ¡Felicidades!`);
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">
        
        <h2 className="admin-page-title">Baja Adopciones</h2>

        <div className="admin-form-card">
          
          <form className="admin-form-layout" onSubmit={handleSubmit}>
            
            {/* COLUMNA IZQUIERDA: Selector + Datos Personales */}
            <div className="admin-form-left">
              
              {/* Selector */}
              <div className="admin-input-group">
                <label>Seleccionar animal</label>
                <select 
                  value={animalSeleccionado}
                  onChange={(e) => setAnimalSeleccionado(e.target.value)}
                  className="admin-select"
                >
                  <option value="" disabled>Seleccione una opción</option>
                  <option value="juana">Juana</option>
                  <option value="simpa">Simpa</option>
                  <option value="maddie">Maddie</option>
                </select>
              </div>

              {/* Título + Primer Input (AGRUPADOS) */}
              <div className="admin-input-group">
                {/* CAMBIO: El título ahora está aquí adentro y usa className */}
                <h3 className="datos-adoptante">Datos del adoptante</h3>
                
                <input 
                  type="text" 
                  placeholder="Nombre y apellido" 
                  className="admin-input"
                  value={nombreAdoptante}
                  onChange={(e) => setNombreAdoptante(e.target.value)}
                />
              </div>

              {/* Resto de inputs (Sin cambios) */}
              <div className="admin-input-group">
                <input 
                  type="tel" 
                  placeholder="Teléfono" 
                  className="admin-input"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="admin-input-group">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="admin-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="admin-input-group">
                <input 
                  type="text" 
                  placeholder="Dirección" 
                  className="admin-input"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>

            </div>

            {/* COLUMNA DERECHA: Datos Adicionales (Textarea grande) */}
            <div className="admin-form-right">
              <div className="admin-input-group" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <label>Datos adicionales del adoptante</label>
                <textarea 
                    className="admin-textarea-large" 
                    value={datosAdicionales}
                    onChange={(e) => setDatosAdicionales(e.target.value)}
                ></textarea>
              </div>
            </div>

          </form>

          {/* Botón Aceptar */}
          <div className="admin-actions">
             <button type="submit" className="btn-admin-submit" onClick={handleSubmit}>
               Aceptar
             </button>
          </div>

          {/* Botón Volver */}
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            <Link to="/admin/adopciones" style={{color: '#666', textDecoration: 'underline'}}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BajaAdopcion;