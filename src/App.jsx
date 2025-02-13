import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Consultar from './pages/consultar';
import CriarDemanda from './pages/criarDemanda';
import AtualizarDemanda from './pages/atualizarDemanda';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/consultar" element={<Consultar />} />
        <Route path="/pages/criar" element={<CriarDemanda />} />
        <Route path="/pages/atualizar" element={<AtualizarDemanda />} />
        {/* Adicionaremos a rota para "Criar Demanda" posteriormente */}
      </Routes>
    </Router>
  );
};

export default App;