const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path')

app.use(express.static('pages'));


const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'healthbox_sa',
});

connection.connect(function (err) {
  if (!err){
    console.log("Conexão como o Banco realizada com sucesso!!!");
  } else{
    console.log("Erro: Conexão NÃO realizada", err);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html')
})


 
app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
 
  connection.query("SELECT * FROM user WHERE email_user = '" + username + "'" , function (err, rows, fields) {
    console.log("Results:", rows);
    if (!err) {
      if (rows.length > 0) {
       
        if ( rows[0].senha === password) {
          console.log('Login com Sucesso!!!');
            res.sendFile(__dirname + '/pages/index.html')
            } else {
             res.send('Senha incorreta');
            }
       
      } else {
        res.send('Login Falhou - Email não cadastrado');
      }
    } else {
      console.log("Erro: Consulta não realizada", err);
      res.send('Login failed');
    }
  });
});

app.post('/cadastro', (req, res) => {
  let nome = req.body.nome;
  let telefone =req.body.telefone;
  let email = req.body.email;
  let password = req.body.password;
 
  connection.query( "INSERT INTO user( `nome_comp_user`, `telefone_user`, `email_user`, `senha_user`) VALUES  ('" + nome + "','" + telefone + "','" + email + "','" + password + "')", function (err, rows, fields) {
    console.log("Results:", rows);
    if (!err) {
      console.log("Cadastro feito com sucesso!!");
      res.sendFile(__dirname + '/pages/login.html')
    } else {
      console.log("Erro: Consulta não realizada", err);
      res.send('Login failed');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000!')
})