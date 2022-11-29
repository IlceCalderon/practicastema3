'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaProducto = Schema({
    nombre: String,
    descripcion: String,
    imagen: String,
    precio: Number,
    categoria: { type: Schema.ObjectId, ref: "Categoria" }
});

module.exports = mongoose.model('Producto', EsquemaProducto);