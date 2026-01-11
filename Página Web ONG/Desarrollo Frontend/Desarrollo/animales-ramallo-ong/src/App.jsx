import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <>
      <Header />
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;