const express = require('express');
const bodyParser = require('body-parser');
const bP = bodyParser;
const app = express();

app.use(bP.urlencoded({extended: true}));
app.use(bP.json());

const MongoClient = require('mongodb').MongoClient 
const uri = "mongodb+srv://breno123:Breno123@crypto-base.bycmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
MongoClient.connect(uri, (err, client) => {
  if (err) {
      return console.log(err, 'ERRO NA CONECÇÃO COM BANCO');
  } else {
      db = client.db('CRYPTO-BASE');

      app.listen(3000,() => {
        console.log('RODANDO NA PORTA 3K');
    });
    
  }
})

app.get('/', (req, res) => {
    db.collection('CRYPTO-TYPES')
    .find({}).toArray((err, result) => {
            if (err) {
                res.sendStatus();
            } else {
                res.send(result);
            }
        })
});

app.post('/set', (req, res) => {
    db.collection('CRYPTO-TYPES')
        .save(req.body, (err, result) => {
            if (err) {
                return res.send(err)
            } else {
                console.log('SALVO NO BANCO');
                res.sendStatus(200);
            }
        })
});