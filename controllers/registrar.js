
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Cuenta = require('../models/usuarios.js');

var Registrar = (function(){
    return {
        registrar: function(req, res){
            mongoose.connect("mongodb://@localhost:27017/storagedb");

            var cuenta = new Cuenta({
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                usuario:req.body.usuario,
                password:re.body.password,
            });
            cuenta.save(function(err, result){
                if(err){
                    res.send("Ha icurrido un error");
                }else{
                    res.send("registrado");
                }
            })

        }
    };
})();

module.exports = Registrar;