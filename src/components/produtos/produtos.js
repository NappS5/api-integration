import React, { useState, useEffect } from 'react';

function Produtos() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/proxy-api?Grupo=264&Empresa=570&Token=9986PTKHUM6DL9X863TU&TipoPesquisa=G&Campo=&Valor=&limite=3&Paginacao=1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro: ' + response.status + ' - ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setData(data);  // Salvando os dados
            setLoading(false);  // Parando o carregamento
        })
        .catch(error => {
            console.error("Erro ao buscar dados da API:", error.message);
            setError(error.message);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div>
            <h1>Dados da API</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Exibe os dados */}
        </div>
    );
}

export default Produtos;
