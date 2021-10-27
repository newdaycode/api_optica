import dataClients from '../models/modClients'

module.exports = {

	create : function(req, res, next){

		const {dni, names, address, phone, mobile, email} = req.body;
		const  data = {
			val1: dni,
			val2: names,
			val3: address,
			val4: phone,
			val5: mobile,
			val6: email
		};
    	dataClients
			.addClient(data)
			.then(client => {
				if(client.status){
					console.log("Cliente registrado correctamente", client);
					let response = {
						status: true,
						code: 200,
						content: "Cliente registrado correctamente",
						icon:'success'
					}
					res.json(response);
				}else{
					console.log("El Cliente ya Existe", client);
					let response = {
						status: false,
						code: 200,
						content: "El Cliente ya Existe",
						icon:'error'
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Registrando Cliente " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Registrando Cliente. ",
					icon:'success'
				}
				return res.json(response);
			});
	},
	list : function(req, res, next){
    	dataClients
			.listClient()
			.then(result => {
				console.log("Clientes: ", result.rows);
				let response = {
					status: true,
					code: 200,
					content: result.rows
				}
				res.json(response);
			})
			.catch(err => {
				console.log("Error Listando Clientes " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Listando Clientes. ",
					icon:'error'
				}
				return res.json(response);
			});
  },
  search : function(req, res, next){
	const data = {
      val1: req.body.dni
    };
    dataClients
		.searchClient(data)
		.then(client => {
			if(client.rows.length>0){
				console.log("Cliente: ", client.rows[0]);
				let response = {
					status: true,
					code: 200,
					content: client.rows[0]
				}
				res.json(response);
			}else{
				console.log("El Cliente no existe");
				let response = {
					status: false,
					code: 200,
					content: "El Cliente no existe",
					icon:'error'
				}
				res.json(response);
			}
		})
		.catch(err => {
			console.log("Error Consultando Cliente " + err);
			let response = {
				status: false,
				code: 500,
				content: "Error Consultando Cliente. ",
				icon:'error'
			}
			return res.json(response);
		});
  },
	update : function(req, res, next){

		const {idclient, names, address, phone,	mobile,	email} = req.body
		const valores = {
		val1: idclient,
		val2: names,
		val3: address,
		val4: phone,
		val5: mobile,
		val6: email
		};
    	dataClients
			.updateClient(valores)
			.then(client => {
				if(client.rowCount>0){
					console.log("Cliente Actualizado correctamente");
					let response = {
						status: true,
						code: 200,
						content: "Cliente Actualizado correctamente",
						icon:'success'
					}
					res.json(response);
				}else{
					console.log("El Cliente no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Cliente no existe",
						icon:'error'
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Actualizando Cliente " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Actualizando Cliente. ",
					icon:'error'
				}
				return res.json(response);
			});
	},
	delete : function(req, res, next){

		const id = req.params.id;
		
		dataClients
			.deleteClient(id)
			.then(client => {
				if(client.rowCount>0){
					console.log("Cliente Eliminado correctamente");
					let response = {
						status: true,
						code: 200,
						content: "Cliente Eliminado correctamente",
						icon:'error'
					}
					res.json(response);
				}else{
					console.log("El Cliente no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Cliente no existe",
						icon:'error'
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Eliminando Cliente " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Eliminando Cliente. ",
					icon:'error'
				}
				return res.json(response);
			});
	}

} // Fin module.exports