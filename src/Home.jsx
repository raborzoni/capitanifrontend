import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Sistema de Demandas</h1>
      <div className="buttonContainer">
        <button onClick={() => navigate('/consultar')} className="button">
          Consultar
        </button>
        <button onClick={() => navigate('/criar')} className="button">
          Criar Demanda
        </button>
      </div>
    </div>
  );
};

export default Home;