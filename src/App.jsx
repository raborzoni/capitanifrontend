import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Consultar from './pages/Consultar';
import CriarDemanda from './pages/CriarDemanda';
import AtualizarDemanda from './pages/AtualizarDemanda';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/consultar" element={<Consultar />} />
        <Route path="/pages/criar" element={<CriarDemanda />} />
        <Route path="/pages/atualizar" element={<AtualizarDemanda />} />
      </Routes>
    </Router>
  );
};

export default App;