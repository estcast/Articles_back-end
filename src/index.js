'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3900;

const url = 'mongodb://localhost:27017/api_rest_reactnotas';

mongoose.Promise = global.Promise;

let article_routes = require('./routes/article');

// Cargamos body-parser, es un middleware para analizar cuerpos de la URL
app.use(bodyParser.urlencoded({extended:false}));

// Cualquier petición se convierte a JSON
app.use(bodyParser.json());

// Se activa CORS para permitir las peticiones AJAX y HTTP desde el Front-End
app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Acces-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api', article_routes);

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
  console.log("Conexión DB exitosa");
  app.listen(port, () => {
    console.log(`Puerto ${port}`);
  });
});
