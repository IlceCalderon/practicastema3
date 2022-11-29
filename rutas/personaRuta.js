'use strict'

var express = require('express');
var PersonaControl = require('../controlador/personaControl');

var api = express.Router();
//api.get('/probando-controlador', PersonaControl.prueba);
api.post('/registro', PersonaControl.registrarPersona)
api.post('/login', PersonaControl.accesoPersona);

module.exports = api;
