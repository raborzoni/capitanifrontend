import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import '../style/consultar.css';

const Consultar = () => {
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const [tipo, setTipo] = useState(''); // Estado para o campo TIPO
    const [info, setInfo] = useState(''); // Estado para o campo INFO
    const [demanda, setDemanda] = useState(null); // Estado para armazenar os dados da demanda
    const [error, setError] = useState(''); // Estado para mensagens de erro

    // Função para consultar a demanda
    const consultarDemanda = async () => {

        if (!tipo || !info) {
            setError('Por favor, preencha os campos TIPO e INFO.');
            setDemanda(null); // Limpa os dados da demanda
            return; // Interrompe a execução da função
        }
        try {

            setError(''); // Limpa mensagens de erro
            setIsLoading(true); // Ativa o estado de carregamento

            const response = await axios.get('http://localhost:8000/api/demandas', {
                params: {
                    tipo: tipo,
                    info: info,
                },
            });

            // Atualiza o estado com os dados da demanda
            setDemanda(response.data[0]); // Pega o primeiro item do array
            setError(''); // Limpa mensagens de erro
        } catch (err) {
            setError('Erro ao consultar a demanda. Verifique os dados e tente novamente.');
            setDemanda(null); // Limpa os dados da demanda
        } finally {
            setIsLoading(false); // Desativa o estado de carregamento
        }
    };

    return (
        <div className="container">
            <h1 className="title">Consulta de Demandas</h1>

            {/* Formulário de consulta */}
            <div className="form">
                <input
                    type="text"
                    placeholder="TIPO"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="INFO"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    className="input"
                />
                <button onClick={consultarDemanda} className="button">
                    Consultar
                </button>
            </div>

            {demanda && (
                <div className="demanda-container">
                    <h2 className="demanda-title">Dados da Demanda</h2>
                    <p><strong>Código:</strong> {demanda.codigo}</p>
                    <p><strong>Descrição:</strong> {demanda.descricao}</p>
                    <p><strong>Descrição Web:</strong> {demanda.descriweb}</p>
                    <p><strong>Tipo:</strong> {demanda.tipo.descricao} (Código: {demanda.tipo.codigo})</p>
                    <p><strong>Grupo:</strong> {demanda.grupo.descricao} (Código: {demanda.grupo.codigo})</p>
                    <p><strong>Área:</strong> {demanda.area.descricao} (Código: {demanda.area.codigo})</p>
                    <p><strong>Status:</strong> {demanda.ativo.descricao} (Código: {demanda.ativo.codigo})</p>
                    <p><strong>Atendimento:</strong> {demanda.atendimento.descricao} (Código: {demanda.atendimento.codigo})</p>
                    <p><strong>Prazo:</strong> {demanda.prazo} dias</p>
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