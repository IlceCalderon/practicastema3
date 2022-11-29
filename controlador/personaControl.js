'use strict'

 
const bcrypt = require('bcrypt');
var PersonaModelo = require('../modelo/persona');
//const persona = require('../modelo/persona')
//var bcrypt = require('bcrypt');
//const persona = require('../modelo/persona');
var persona = new PersonaModelo();

function prueba(req, res) {
    res.status(200).send({
        mesagge: 'Probando una accion del controlador de usuarios del api REST con node y mongo'
    });
}

function registrarPersona(req, res) {
    var persona = new PersonaModelo();

    var params = req.body; //recibe todos los datos por POST
    console.log(params);

    persona.nombre = params.nombre
    persona.apellidos = params.apellidos
    persona.email = params.email
    persona.whatsapp = params.whatsapp
    persona.calle = params.calle
    persona.numero = params.numero
    persona.colonia = params.colonia
    persona.cp = params.cp
    persona.municipio = params.municipio
    persona.calles = params.calles
    persona.referencias = params.referencias
    persona.password = params.password


    // usuario.nombre = params.nombre;
    // usuario.apellido = params.apellido;
    // usuario.email = params.email;
    // usuario.password = params.password;
    // usuario.rol = 'ROLE_USER';
    // usuario.imagen = 'null';

    // if (params.password) {
    //     //encriptar ocntraseña y guradar datos
    // } else {
    //     res.status(500).send({ mesagge: 'Introduce la contraseña' })
    // }
    if (params.password) {
        bcrypt.hash(params.password, 10, function(err, hash) {
            persona.password = hash;
            if (persona.nombre != null && persona.apellidos != null && persona.email != null && persona.whatsapp != null && persona.calle  != null && persona.numero != null && persona.colonia != null && persona.cp != null && persona.municipio != null && persona.calles != null && persona.referencias  != null ) {
                //guardar el ususario en BD
                persona.save((err, personaAlmacenado) => {
                    if (err) {
                        res.status(500).send({ mesagge: 'Error al guardar el usuario' });
                    } else {
                        if (!personaAlmacenado) {
                            res.status(404).send({ mesagge: 'No se ha registrado el ususario' });
                        } else {
                            //nos devuelve un objeto con los datos del ususario guardado
                            res.status(200).send({ persona: personaAlmacenado });
                        }
                    }

                });
            } else {
                res.status(200).send({ mesagge: 'Introduce todos los campos' });
            }
        });

    } else {
        res.status(500).send({ mesagge: 'Introduce la contraseña' });
    }


}

function accesoPersona(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    

    PersonaModelo.findOne({ email: email}, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } else {   
            //res.status(200).send({user: user});
        }
        if (!user) {
            res.status(404).send({ mesagge: 'El usuario no existe' });
        } else {
            bcrypt.compare(password, user.password, function(err, check) {
                if (check) {
                    //devolver los datos del ususario logeado
                    console.log('coincide el password')
                    if (params.gethash) {
                        //devolver un token de jwt
                    } else {
                        res.status(200).send({ user: user });
                    }
                } else {
                    res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
                }
            });
        }
    });
}

module.exports = {
    prueba, registrarPersona, accesoPersona
};
