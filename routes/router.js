"use strict";
let express = require('express');
let router = express.Router();
let user = require('../models/user');
let usuarios = require('../models/usuarios')


//LOGIN
router.get('/', function(req, res){
	res.render('index');
});


router.get('/login', function(req, res){
	res.render('login');
});

// router.get('/adminusr', function(req, res){
// 	res.render('adminusr');
// });

router.post('/login', function(req, res, next){
	user.authenticate(req.body.email, req.body.password, function(error,user){
		if(error)
			next(error);
		else if(!user) {
			var err = new Error('Usuario o contraseña incorrecta');
            err.status = 401;
			next(err); }
		else{
			req.session.username = user.username;
			res.redirect('/adminusr');  }
	});
});

router.get('/adminusr',function(req, res, next){
	if(!req.session.username){
		res.redirect('/login');
	}
	// else 
	// res.render('adminusr',{usuario:req.session.username, modelo:user});
	usuarios.findAll(function(error,users){
		if(error)
			next(error);
		else if(!users)
			users = [];
		else
			res.render('adminusr',{usuario:req.session.username, modelo:users});
	}); 
});

//INSERTAR
router.post('/insertar', function(req, res, next){
	usuarios.insert(req.body.nombre,req.body.apellido,req.body.usuario,req.body.password,req.body.correo,req.body.sexo,req.body.direccion1,req.body.direccion2,req.body.telefono, function(error,user){
		if(error)
			next(error);
		else if(user){
			var err = new Error('usuario ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/adminusr');
	  });
});

// ACTUALIZAR
router.post('/actualizar', function(req, res, next){
	usuarios.update(req.body.nombre,req.body.apellido,req.body.usuario,req.body.password,req.body.correo,req.body.sexo,req.body.direccion1,req.body.direccion2,req.body.telefono, function(error,msg){
		console.log(req.body.usuario);
		if(error)
			next(error);
		else if(!msg){
			var err = new Error('Usuario no existe');
			err.status = 401;
			next (err);}
		res.redirect('/adminusr');
		
	  });
});

// //ELIMINAR
router.post('/eliminar', function(req, res, next){
	usuarios.delete(req.body.usuario, function(error,msg){
		if(error)
			next(error);
		else if(msg){
			var err = new Error('usuario no existe');
			err.status = 401;
			next(err);
		}
		else{
			console.log('exito');
			res.redirect('/adminusr');}
	  });
});


//ESTATUS PEDIDO cambiar Todo donde dice users
router.get('/adminstatus',function(req, res, next){
	if(!req.session.username){
		res.redirect('/login');
	}
	// else 
	// res.render('adminusr',{usuario:req.session.username, modelo:user});
	estados.findAll(function(error,users){
		if(error)
			next(error);
		else if(!users)
			users = [];
		else
			res.render('adminstatus',{usuario:req.session.username, modelo:users});
	}); 
});

//INSERTAR
router.post('/insertarP', function(req, res, next){
	estados.insert(req.body.ordernum,req.body.orderstat,req.body.orderdate,req.body.usuario,req.body.correo,req.body.direccion1,req.body.direccion2,req.body.telefono, function(error,user){
		if(error)
			next(error);
		else if(user){
			var err = new Error('orden ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/adminstatus');
	  });
});

// ACTUALIZAR
router.post('/actualizarP', function(req, res, next){
	estados.update(req.body.ordernum,req.body.orderstat,req.body.orderdate,req.body.usuario,req.body.correo,req.body.direccion1,req.body.direccion2,req.body.telefono, function(error,msg){
		console.log(req.body.ordernum);
		if(error)
			next(error);
		else if(!msg){
			var err = new Error('Orden no existe');
			err.status = 401;
			next (err);}
		res.redirect('/adminstatus');
		
	  });
});

// //ELIMINAR
router.post('/eliminarP', function(req, res, next){
	estados.delete(req.body.ordernum, function(error,msg){
		if(error)
			next(error);
		else if(msg){
			var err = new Error('orden no existe');
			err.status = 401;
			next(err);
		}
		else{
			console.log('exito');
			res.redirect('/adminstatus');}
	  });
});





module.exports = router;