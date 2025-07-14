const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/validar', (req, res) => {
  const { campo, valor } = req.body;

  const regexes = {
    email: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
    placa: /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    matricula: /^20\d{2}\d{5}INFO$/,
    campus: /^IFCE - Campus [A-Za-zÀ-ÿ\s]+$/
  };

  const valido = regexes[campo]?.test(valor) ?? false;
  res.json({ valido });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
