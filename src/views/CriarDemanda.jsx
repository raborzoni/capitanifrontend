import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cropped-LOGO_CAPESESP-1400x1016.png';
import '../style/criarDemanda.css';

const CriarDemanda = () => {
    const [formData, setFormData] = useState({
        descricao: '',
        descriweb: '',
        tipo: '',
        grupo: '',
        area: '',
        ativo: '',
        atendimento: '',
        prazo: '',
    });
    const [mensagem, setMensagem] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = name === 'prazo' ? parseInt(value, 10) || '' : value;
        setFormData({ ...formData, [name]: finalValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.descricao ||
            !formData.descriweb ||
            !formData.tipo ||
            !formData.grupo ||
            !formData.area ||
            !formData.ativo ||
            !formData.atendimento ||
            !formData.prazo
        ) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        const payload = {
            ...formData,
            prazo: parseInt(formData.prazo, 10)
        };

        try {
            setIsLoading(true);
            setError('');

            const response = await axios.post(
                'http://localhost:8000/api/demandas',
                formData,
                {
                    auth: {
                        username: 'candidato',
                        password: 'cape123',
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setMensagem(response.data);

            setFormData({
                descricao: '',
                descriweb: '',
                tipo: '',
                grupo: '',
                area: '',
                ativo: '',
                atendimento: '',
                prazo: ''
            });
        } catch (err) {
            setError('Erro ao criar a demanda. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="criar-demanda-container">
            <div className="logo-container">
                <img src={logo} alt="Logo do Sistema" className="logo" />
            </div>
            <h1 className="criar-demanda-title">Criar Nova Demanda</h1>
            <form onSubmit={handleSubmit} className="criar-demanda-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Descrição:</label>
                        <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Descrição Web:</label>
                        <input type="text" name="descriweb" value={formData.descriweb} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Tipo:</label>
                        <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} pattern="[0-9]*" required />
                    </div>
                    <div className="form-group">
                        <label>Grupo:</label>
                        <input type="text" name="grupo" value={formData.grupo} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Área:</label>
                        <input type="text" name="area" value={formData.area} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Ativo:</label>
                        <input type="text" name="ativo" value={formData.ativo} onChange={handleChange} pattern="[0-9]*" required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Atendimento:</label>
                        <input type="text" name="atendimento" value={formData.atendimento} onChange={handleChange} pattern="[0-9]*" required />
                    </div>
                    <div className="form-group">
                        <label>Prazo (dias):</label>
                        <input type="number" name="prazo" value={formData.prazo} onChange={handleChange} min="1" step="1" onKeyDown={(e) => {
                            if (e.key === '.' || e.key === ',') {
                                e.preventDefault();
                            }
                        }} required />
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}
                {mensagem && <p className="success-message">{mensagem}</p>}

                <div className="button-group">
                    <button type="submit" disabled={isLoading} className="submit-button">
                        {isLoading ? 'Enviando...' : 'Criar Demanda'}
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="cancel-button">
                        Voltar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CriarDemanda;