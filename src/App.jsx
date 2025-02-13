import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Consultar from './pages/Consultar';
import CriarDemanda from './pages/CriarDemanda';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/consultar" element={<Consultar />} />
        <Route path="/pages/criarDemanda" element={<CriarDemanda />} />
        {/* Adicionaremos a rota para "Criar Demanda" posteriormente */}
      </Routes>
    </Router>
  );
};

export default App;