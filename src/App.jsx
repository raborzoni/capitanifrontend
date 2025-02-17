import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home.jsx';
import Consultar from '@/views/Consultar.jsx';
import CriarDemanda from '@/views/CriarDemanda.jsx';
import AtualizarDemanda from '@/views/AtualizarDemanda.jsx';

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