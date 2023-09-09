const express = require('express');
const cors = require('cors');
const uploadCsv = require('./middlewares/uploadcsv');
const validateCsv = require('./middlewares/validatecsv');
const updateDatabase = require('./middlewares/updateDatabase');

const app = express();
app.use(cors());

app.use(express.static('public'));

app.post('/upload', uploadCsv.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('Nenhum arquivo foi enviado');
    }

    const validationErrors = await validateCsv(file.filename);
    if (validationErrors !== true) {
        return res.status(400).send(`Erros de validação: ${validationErrors.join(', ')}`);
    }

    await updateDatabase(file.filename);

    res.send('Atualização do banco de dados concluída com sucesso');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});