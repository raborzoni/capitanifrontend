import React, { useState } from 'react';
import axios from 'axios';

const DemandaForm = ({ demanda, onSave }) => {
    const [formData, setFormData] = useState(demanda || {
        descricao: '',
        descricaoweb: '',
        tipo: '',
        grupo: '',
        area: '',
        ativo: '',
        atendimento: '',
        prazo: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} />
            {/* Adicione os outros campos aqui */}
            <button type="submit">Salvar</button>
        </form>
    );
};

export default DemandaForm;