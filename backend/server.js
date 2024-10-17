const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.use(express.json());


app.post('/proxy-api', (req, res) => {
    console.log('Dados enviados para a API:', req.body);
    
    axios.post('https://equilibrioapperp.pontalsistemas.com.br/ServerIntegracao/PesquisaProduto', {
        Grupo: req.body.Grupo,
        Empresa: req.body.Empresa,
        Token: req.body.Token,
        TipoPesquisa: req.body.TipoPesquisa,
        Campo: req.body.Campo,
        Valor: req.body.Valor,
        limite: req.body.limite,
        Paginacao: req.body.Paginacao
        },{

        headers: {
            'X-Embarcadero-App-Secret': 'DE1BA56B-43C5-469D-9BD2-4EB146EB8473',
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Accept': '*/*'
        }
    })
    .then(response => {
        console.log('Resposta da API recebida:', response.data);
        res.json(response.data); // enviando os dados para o React
    })
    .catch(error => {
        console.log('Erro ao acessar a API:', error.message);
        if (error.response) {
            console.log('Dados do erro:', error.response.data);
            console.log('Status do erro:', error.response.status);
            res.status(error.response.status).json({message: error.response.data});
        } else {
            res.status(500).json({message: 'Erro ao acessar a API real'})
        }
    });
});


app.listen(5000, () => {
    console.log('Servidor proxy rodando em http://localhost:5000');
});