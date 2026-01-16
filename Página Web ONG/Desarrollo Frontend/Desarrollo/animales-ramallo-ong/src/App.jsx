import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Importar Páginas
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import HistoriasLista from './pages/HistoriasLista';
import HistoriasDetalle from './pages/HistoriasDetalle';
import NoticiasLista from './pages/NoticiasLista';
import NoticiaDetalle from './pages/NoticiasDetalle';
import AdopcionesLista from './pages/AdopcionesLista';
import AdopcionDetalle from './pages/AdopcionesDetalle';
import AdopcionForm from './pages/AdopcionForm';

import Login from './pages/admin/Login';
import PanelControl from './pages/admin/PanelControl';
import MenuAdopciones from './pages/admin/adopciones/MenuAdopciones';
import AltaAdopcion from './pages/admin/Adopciones/AltaAdopcion';

function App() {
  const location = useLocation();
  
  // Verificamos si estamos en la página de login o en el panel admin para ocultar Header y Footer
  const isHiddenPage = location.pathname === '/login' || 
                       location.pathname === '/admin/panel' ||
                       location.pathname === '/admin/adopciones' ||
                       location.pathname === '/admin/adopciones/alta';

  return (
    <>
      {/* Solo mostrar el Header si NO se está en login o panel admin */}
      {!isHiddenPage && <Header />}
      
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/contacto" element={<Contacto />} />
          
          {/* Historias */}
          <Route path="/historias" element={<HistoriasLista />} />
          <Route path="/historias/:id" element={<HistoriasDetalle />} />
          
          {/* Noticias */}
          <Route path="/noticias" element={<NoticiasLista />} />
          <Route path="/noticias/:id" element={<NoticiaDetalle />} />
          
          {/* Adopciones */}
          <Route path="/adopciones" element={<AdopcionesLista />} />
          <Route path="/adopciones/detalle/:id" element={<AdopcionDetalle />} />
          <Route path="/adopciones/formulario/:id" element={<AdopcionForm />} />

          {/* RUTA DEL ADMIN */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/panel" element={<PanelControl />} />
          <Route path="/admin/adopciones" element={<MenuAdopciones />} />
          <Route path="/admin/adopciones/alta" element={<AltaAdopcion />} />
        </Routes>
      </main>

      {/* Solo mostrar el Footer si NO se está en login */}
      {!isHiddenPage && <Footer />}
    </>
  );
}

export default App;