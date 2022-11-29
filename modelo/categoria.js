'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaCategoria = Schema({
    nombre: String,
    descripcion: String,
});

module.exports = mongoose.model('Categoria', EsquemaCategoria);