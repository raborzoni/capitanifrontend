import React from 'react';
import DemandaList from './components/DemandaList'; // Caminho relativo correto
import DemandaForm from './components/DemandaForm'; 

function App() {
  const handleSave = (data) => {
    axios.post('http://localhost:8000/api/demandas', data)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Gerenciamento de Demandas</h1>
      <DemandaForm onSave={handleSave} />
      <DemandaList />
    </div>
  );
};

export default App
