import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import '../style/consultar.css';

const Consultar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tipo, setTipo] = useState('');
    const [info, setInfo] = useState('');
    const [demanda, setDemanda] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const consultarDemanda = async () => {

        if (!tipo || !info) {
            setError('Por favor, preencha os campos TIPO e INFO.');
            setDemanda(null);
            return;
        }
        try {

            setError('');
            setIsLoading(true);

            const response = await axios.get('http://localhost:8000/api/demandas', {
                params: {
                    tipo: tipo,
                    info: info,
                },
            });

            setDemanda(response.data[0]);
            setError('');
        } catch (err) {
            setError('Erro ao consultar a demanda. Verifique os dados e tente novamente.');
            setDemanda(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAtualizar = () => {
        if (demanda) {
            navigate('/pages/atualizar', { state: { demanda } });
        }
    };

    return (
        <div className="container">
            <h1 className="title">Consulta de Demandas</h1>


            <div className="form">
                <input type="text" placeholder="TIPO" value={tipo} onChange={(e) => setTipo(e.target.value)} className="input" />
                <input type="text" placeholder="INFO" value={info} onChange={(e) => setInfo(e.target.value)} className="input" />
                <button onClick={consultarDemanda} className="button">
                    Consultar
                </button>
                <button type="button" onClick={() => navigate('/')} className="cancel-button">
                    Voltar
                </button>
            </div>

            {demanda && (
                <div className="demanda-container">
                    <h2 className="demanda-title">Dados da Demanda</h2>
                    <p><strong>Código:</strong> {demanda.codigo}</p>
                    <p><strong>Descrição:</strong> {demanda.descricao}</p>
                    <p><strong>Descrição Web:</strong> {demanda.descricaoweb}</p>
                    <p><strong>Tipo:</strong> {demanda.tipo.descricao} (Código: {demanda.tipo.codigo})</p>
                    <p><strong>Grupo:</strong> {demanda.grupo.descricao} (Código: {demanda.grupo.codigo})</p>
                    <p><strong>Área:</strong> {demanda.area.descricao} (Código: {demanda.area.codigo})</p>
                    <p><strong>Status:</strong> {demanda.ativo.descricao} (Código: {demanda.ativo.codigo})</p>
                    <p><strong>Atendimento:</strong> {demanda.atendimento.descricao} (Código: {demanda.atendimento.codigo})</p>
                    <p><strong>Prazo:</strong> {demanda.prazo} dias</p>

                    <button onClick={handleAtualizar} className="button">
                        Atualizar
                    </button>
                </div>
            )}

            {error && <p className="error">{error}</p>}

            {isLoading && (
                <div className="loading">
                    <ClipLoader color="#007bff" size={30} />
                    <p>Carregando...</p>
                </div>
            )}
        </div>
    );
};

export default Consultar;