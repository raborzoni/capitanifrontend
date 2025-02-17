import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Consultar from '@/views/Consultar';
import CriarDemanda from '@/pages/CriarDemanda.jsx';
import AtualizarDemanda from '@/pages/AtualizarDemanda.jsx';

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