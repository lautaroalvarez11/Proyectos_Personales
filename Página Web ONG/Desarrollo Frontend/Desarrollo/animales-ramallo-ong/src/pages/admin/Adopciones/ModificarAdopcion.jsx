import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const ModificarAdopcion = () => {
  // Estado para el selector
  const [animalSeleccionado, setAnimalSeleccionado] = useState('');
  
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([null, null, null]);

  // Simulación de carga de datos al seleccionar un animal
  const handleSelectChange = (e) => {
    const seleccion = e.target.value;
    setAnimalSeleccionado(seleccion);
    
    // Acá hacer un fetch a la API para traer los datos del animal
    if (seleccion === 'juana') {
        setNombre('Juana');
        setDescripcion('Descripción actual de Juana...');
    } else {
        setNombre('');
        setDescripcion('');
    }
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...imagenes];
      newImages[index] = URL.createObjectURL(file);
      setImagenes(newImages);
    }
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">
        
        <h2 className="admin-page-title">Modificación Adopciones</h2>

        <div className="admin-form-card">
          
          <form className="admin-form-layout">
            
            {/* COLUMNA IZQUIERDA: Selector + Descripción */}
            <div className="admin-form-left">
              
              {/* 1. Selector de Animal */}
              <div className="admin-input-group">
                <label>Seleccionar animal</label>
                <select 
                  value={animalSeleccionado}
                  onChange={handleSelectChange}
                  className="admin-select"
                >
                  <option value="" disabled>Seleccione una opción</option>
                  <option value="juana">Juana</option>
                  <option value="simpa">Simpa</option>
                  <option value="maddie">Maddie</option>
                </select>
              </div>

              {/* 2. Descripción (Textarea) */}
              <div className="admin-input-group">
                <label>Modificar datos adicionales</label>
                <textarea 
                  value={descripcion} 
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="admin-textarea"
                ></textarea>
              </div>

            </div>

            {/* COLUMNA DERECHA: Nombre + Imágenes */}
            <div className="admin-form-right right-column-aligned">
              
              {/* 3. Nombre (Input) */}
              <div className="admin-input-group">
                <label>Modificar nombre</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)}
                  className="admin-input"
                />
              </div>

              {/* 4. Imágenes */}
              <div>
                  <label className="admin-label-images">Modificar imágenes</label>
                  <div className="admin-images-grid">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="image-upload-box">
                        <input 
                          type="file" 
                          accept="image/*" 
                          id={`file-mod-${index}`}
                          onChange={(e) => handleImageChange(index, e)}
                          hidden
                        />
                        <label htmlFor={`file-mod-${index}`} className="upload-label">
                          {imagenes[index] ? (
                            <img src={imagenes[index]} alt="Preview" className="preview-img" />
                          ) : (
                            <span className="placeholder-text">Imagen {index + 1}</span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
              </div>

            </div>

          </form>

          <div className="admin-actions">
             <button type="submit" className="btn-admin-submit">Enviar</button>
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

export default ModificarAdopcion;