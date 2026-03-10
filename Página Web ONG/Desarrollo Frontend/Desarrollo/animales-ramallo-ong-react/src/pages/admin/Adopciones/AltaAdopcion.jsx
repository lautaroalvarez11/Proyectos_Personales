import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const AltaAdopcion = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([null, null, null]);

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
        
        <h2 className="admin-page-title">Alta Adopciones</h2>

        <div className="admin-form-card">
          
          <form className="admin-form-layout">
            <div className="admin-form-left">
              <div className="admin-input-group">
                <label>Ingrese nombre</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div className="admin-input-group">
                <label>Datos adicionales</label>
                <textarea 
                  value={descripcion} 
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="admin-textarea"
                ></textarea>
              </div>
            </div>

            <div className="admin-form-right">
              <div> 
                <label className="admin-label-images">Cargar imágenes</label>
                <div className="admin-images-grid">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="image-upload-box">
                      <input 
                        type="file" 
                        accept="image/*" 
                        id={`file-${index}`}
                        onChange={(e) => handleImageChange(index, e)}
                        hidden
                      />
                      <label htmlFor={`file-${index}`} className="upload-label">
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

export default AltaAdopcion;