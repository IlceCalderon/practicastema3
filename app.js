'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var persona_ruta = require('./rutas/personaRuta');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar cabeceras http

// rutas base
app.use('/api', persona_ruta);


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

//configurar cabeceras http

// rutas base

//respuesta servidor
//app.get('/pruebas', function(req, res) {
  //  res.status(200).send({ mesage: 'Bienvenido  al Sistema de Pizza' });
//});


module.exports = app;

