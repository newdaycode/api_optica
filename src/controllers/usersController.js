import dataUsers from '../models/modUsers'

module.exports = {

	create : function(req, res, next){
		const {dni, names, surnames, address, phone, mobile, email, username, password, idperfil} = req.body

		const data = {
			val1: dni,
			val2: names,
			val3: surnames,
			val4: address,
			val5: phone,
			val6: mobile,
			val7: email,
			val8: username,
			val9: password,
			val10: idperfil
		};
    	dataUsers
			.addUser(data)
			.then(user => {

				if(user.status){
					console.log("Usuario registrado correctamente", user);
					let response = {
						status: true,
						code: 200,
						content: "Usuario registrado correctamente"
					}

					res.json(response);
				}else{
					console.log("El Usuario ya Existe", user);
					let response = {
						status: true,
						code: 200,
						content: "El Usuario ya Existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Registrando Usuario " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Registrando Usuario. " + err
				}
				return res.json(response);
			});
	},
	list : function(req, res, next){
    	dataUsers
			.listUser()
			.then(result => {
				console.log("Usuarios: ", result.rows);
				let response = {
					status: true,
					code: 200,
					content: result.rows
				}
				res.json(response);
			})
			.catch(err => {
				console.log("Error Listando Usuarios " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Listando Usuarios. " + err
				}
				return res.json(response);
			});
  },
	search : function(req, res, next){
		const data = {
			val1: req.body.dni
		};
    	dataUsers
			.searchUser(data)
			.then(user => {
				if(user.rows.length>0){
					console.log("Usuario: ", user.rows[0]);
					let response = {
						status: true,
						code: 200,
						content: user.rows[0]
					}
					res.json(response);
				}else{
					console.log("El Usuario no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Usuario no existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Consultando Usuario " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Consultando Usuario. " + err
				}
				return res.json(response);
			});
  },
	update : function(req, res, next){
		const {idUser, names, surnames, address, phone, mobile, email} = req.body
		const valores = {
			val1: idUser,
			val2: names,
			val3: surnames,
			val4: address,
			val5: phone,
			val6: mobile,
			val7: email
		};
    	dataUsers
			.updateUser(valores)
			.then(user => {
				if(user.rowCount>0){
					console.log("Usuario Actualizado correctamente");
					let response = {
						status: true,
						code: 200,
						content: "Usuario Actualizado correctamente"
					}
					res.json(response);
				}else{
					console.log("El Usuario no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Usuario no existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Actualizando Usuario " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Actualizando Usuario. " + err
				}
				return res.json(response);
			});
	},
	delete : function(req, res, next){
		const id = req.body.idUser;
		dataUsers
			.deleteUser(id)
			.then(user => {
				if(user.rowCount>0){
					console.log("Usuario Eliminado correctamente");
					let response = {
						status: true,
						code: 200,
						content: "Usuario Eliminado correctamente"
					}
					res.json(response);
				}else{
					console.log("El Usuario no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Usuario no existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Eliminando Usuario " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Eliminando Usuario. " + err
				}
				return res.json(response);
			});
	}

} // Fin module.exports