import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/atualizarDemanda.css';

const AtualizarDemanda = () => {
    const [formData, setFormData] = useState({
        codigo: '',
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
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.demanda) {
            const demanda = location.state.demanda;
            
            setFormData({
                codigo: demanda.codigo,
                descricao: demanda.descricao,
                descricaoweb: demanda.descricaoweb,
                tipo: demanda.tipo.codigo,
                grupo: demanda.grupo.codigo,
                area: demanda.area.codigo,
                ativo: demanda.ativo.codigo,
                atendimento: demanda.atendimento.codigo,
                prazo: demanda.prazo,
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = name === 'prazo' ? parseInt(value, 10) || '' : value;
        setFormData({ ...formData, [name]: finalValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.codigo ||
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

        try {
            setIsLoading(true);
            setError('');

            const response = await axios.put(
                `http://localhost:8000/api/demandas`,
                formData,
                {
                    auth: {
                        username: 'candidato',
                        password: 'cape123',
                    },
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                }
            );

            setMensagem('Demanda atualizada com sucesso!');
        } catch (err) {
            setError('Erro ao atualizar a demanda. Tente novamente.');
            console.error('Erro detalhado:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="atualizar-demanda-container">
            <h1 className="atualizar-demanda-title">Atualizar Demanda</h1>

            <form onSubmit={handleSubmit} className="atualizar-demanda-form">
                <div className="form-group">
                    <label>Código:</label>
                    <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} disabled />
                </div>

                <div className="form-group">
                    <label>Descrição:</label>
                    <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Descrição Web:</label>
                    <input type="text" name="descriweb" value={formData.descriweb} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Tipo:</label>
                    <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Grupo:</label>
                    <input type="text" name="grupo" value={formData.grupo} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Área:</label>
                    <input type="text" name="area" value={formData.area} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Ativo:</label>
                    <input type="text" name="ativo" value={formData.ativo} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Atendimento:</label>
                    <input type="text" name="atendimento" value={formData.atendimento} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Prazo (dias):</label>
                    <input type="number" name="prazo" value={formData.prazo} onChange={handleChange} min="1" step="1"
                        onKeyDown={(e) => {
                            if (e.key === '.' || e.key === ',') {
                                e.preventDefault();
                            }
                        }} required />
                </div>

                {error && <p className="error-message">{error}</p>}
                {mensagem && <p className="success-message">{mensagem}</p>}

                <div className="button-group">
                    <button type="submit" disabled={isLoading} className="submit-button">
                        {isLoading ? 'Atualizando...' : 'Atualizar Demanda'}
                    </button>
                    <button type="button" onClick={() => navigate('/consultar')} className="cancel-button">
                        Voltar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AtualizarDemanda;