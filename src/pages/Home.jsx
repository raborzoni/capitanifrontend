import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/home.css';
import logo from '../assets/cropped-LOGO_CAPESESP-1400x1016.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <div className="logo-container">
        <img src={logo} alt="Logo do Sistema" className="logo" />
      </div>

      <div className="demanda-home-tittle-container">
        <h1 className="title">Sistema de Demandas</h1>
      </div>

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