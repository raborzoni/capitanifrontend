import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [tipo, setTipo] = useState(''); // Estado para o campo TIPO
  const [info, setInfo] = useState(''); // Estado para o campo INFO
  const [demanda, setDemanda] = useState(null); // Estado para armazenar os dados da demanda
  const [error, setError] = useState(''); // Estado para mensagens de erro

  // Função para consultar a demanda
  const consultarDemanda = async () => {
    try {
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
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Consulta de Demandas</h1>

      {/* Formulário de consulta */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="TIPO"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="INFO"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          style={styles.input}
        />
        <button onClick={consultarDemanda} style={styles.button}>
          Consultar
        </button>
      </div>

      {/* Exibição dos dados da demanda */}
      {demanda && (
        <div style={styles.demandaContainer}>
          <h2 style={styles.demandaTitle}>Dados da Demanda</h2>
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

      {/* Exibição de erros */}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

// Estilos (pode ser movido para um arquivo CSS separado)
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  demandaContainer: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  demandaTitle: {
    marginTop: '0',
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default App;