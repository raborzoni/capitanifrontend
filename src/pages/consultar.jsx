import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cropped-LOGO_CAPESESP-1400x1016.png';
import Modal from 'react-modal';
import '../style/consultar.css';

Modal.setAppElement('#root');

const Consultar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tipo, setTipo] = useState('');
    const [info, setInfo] = useState('');
    const [demanda, setDemanda] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mensagem, setMensagem] = useState('');
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
            navigate('/atualizar', { state: { demanda } });
        }
    };

    const handleDeletar = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        limparCampos();
    };

    const limparCampos = () => {
        setTipo('');
        setInfo('');
        setDemanda(null);
        setMensagem('');
        setError('');
    };

    const confirmarDelecao = async () => {
        try {
            setIsLoading(true);
            setError('');

            const response = await axios.delete('http://localhost:8000/api/demandas', {
                auth: {
                    username: 'candidato',
                    password: 'cape123',
                },
                data: {
                    codigo: demanda.codigo,
                },
            });

            setMensagem('Demanda deletada com sucesso!');
            setDemanda(null);
            setTipo('');
            setInfo('');
            setIsModalOpen(false);
        } catch (err) {
            setError('Erro ao deletar a demanda. Tente novamente.');
            console.error('Erro detalhado:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">

            <div className="logo-container">
                <img src={logo} alt="Logo do Sistema" className="logo" />
            </div>
            <h1 className="title">Consulta de Demandas</h1>
            <div className="form">
                <input type="text" placeholder="TIPO" value={tipo} onChange={(e) => setTipo(e.target.value)} className="input" />
                <input type="text" placeholder="INFO" value={info} onChange={(e) => setInfo(e.target.value)} className="input" />
                <button onClick={consultarDemanda} className="button">
                    Consultar
                </button>
                <button type="button" onClick={() => navigate('/')} className="cancelButton">
                    Voltar
                </button>
            </div>

            {demanda && (
                <div className="demanda-container">
                    <div className="demanda-tittle-container">
                        <h2 className="demanda-title">Dados da Demanda</h2>
                    </div>
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
                    <button onClick={handleDeletar} className="consultar-button delete-button">
                        Deletar
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

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirmar Deleção"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Confirmar Deleção</h2>
                <p>Tem certeza que deseja deletar a demanda <strong>{demanda?.codigo}</strong>?</p>
                <div className="modal-button-group">
                    <button onClick={confirmarDelecao} className="modal-button confirm-button">
                        Confirmar
                    </button>
                    <button onClick={closeModal} className="modal-button cancelButton">
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Consultar;