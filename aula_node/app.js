const express = require("express");
const { engine } = require("express-handlebars");
const mysql = require('mysql2');

const app = express();

//Configuração do express-handlebars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");


app.use(express.json());
app.use(express.urlencoded({extended: false}));


const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'aula'
});

conexao.connect(function(erro){
    if (erro) throw erro;
    console.log("Conectado no Banco de Dados!");
})


app.get('/', function(req,res){
    res.render('formulario');

});

app.post('/cadastrar', function (req, res) {
    const { email, senha, nivel_acesso } = req.body;

    const sql = 'INSERT INTO usuarios (email, senha, nivel_acesso) VALUES (?, ?, ?)';
    conexao.query(sql, [email, senha, nivel_acesso], function (erro, resultado) {
        if (erro) {
            if (erro.code === 'ER_DUP_ENTRY') {
                return res.send("Erro: Email já cadastrado.");
            }
            console.error(erro);
            return res.send("Erro ao cadastrar usuário.");
        }

        res.send("Usuário cadastrado com sucesso!");
    });
});

app.post('/login', function(req,res){
    const { email, senha }= req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
     conexao.query(sql, [email, senha], function (erro, resultados) {
        if (erro) {
            console.error(erro);
            return res.send('Erro ao verificar login');
        }

        if (resultados.length === 0) {
            return res.send('Login inválido. Verifique seu email e senha.');
        }

        const usuario = resultados[0];
        res.send('Bem-vindo, '+ usuario.nivel_acesso);
        
    });
});



app.get('/listar', function(req, res) {
    let sql = 'SELECT * FROM usuarios';
    conexao.query(sql,function(erro, retorno){
        res.render('formulario',{listagem:retorno});

    });

});

app.listen(8050, () => {
    console.log("Servidor rodando em http://localhost:8050");
    });