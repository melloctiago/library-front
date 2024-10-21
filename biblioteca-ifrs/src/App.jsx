import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NovoLivro from './pages/NovoLivro';
import EditarLivro from './pages/EditarLivro';
import LivroDetalhes from './pages/LivroDetalhes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo" element={<NovoLivro />} />
        <Route path="/editar/:id" element={<EditarLivro />} />
        <Route path="/livro/:id" element={<LivroDetalhes />} />
      </Routes>
    </Router>
  );
};

export default App;