import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Consultar from '../src/pages/Consultar.jsx';
import CriarDemanda from '../src/pages/CriarDemanda.jsx';
import AtualizarDemanda from '../src/pages/AtualizarDemanda.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consultar" element={<Consultar />} />
        <Route path="/criar" element={<CriarDemanda />} />
        <Route path="/atualizar" element={<AtualizarDemanda />} />
      </Routes>
    </Router>
  );
};

export default App;