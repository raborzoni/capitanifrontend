import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DemandaList = () => {
    const [demandas, setDemandas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/demandas')
            .then(response => setDemandas(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Lista de Demandas</h2>
            <ul>
                {demandas.map(demanda => (
                    <li key={demanda.codigo}>{demanda.descricao}</li>
                ))}
            </ul>
        </div>
    );
};

export default DemandaList;