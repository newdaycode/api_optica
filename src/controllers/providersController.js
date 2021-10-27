import dataProviders from '../models/modProviders'

module.exports = {

	create : function(req, res, next){

        const {nit, name, address, phone, mobile, email, contact, website} =req.body
        const data = {
            val1: nit,
            val2: name,
            val3: address,
            val4: phone,
            val5: mobile,
            val6: email,
            val7: contact,
            val8: website
        };
		dataProviders
			.addProvider(data)
			.then(provider => {
				if(provider.status){
					console.log("Proveedor registrado correctamente", provider);
					let response = {
						status: true,
						code: 200,
						content: "Proveedor registrado correctamente"
					}
					res.json(response);
				}else{
					console.log("El Proveedor ya Existe", provider);
					let response = {
						status: true,
						code: 200,
						content: "El Proveedor ya Existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Registrando Proveedor " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Registrando Proveedor. " + err
				}
				return res.json(response);
			});
	},
	list : function(req, res, next){
		dataProviders
			.listProvider()
			.then(result => {
				console.log("Proveedores: ", result.rows);
				let response = {
					status: true,
					code: 200,
					content: result.rows
				}
				res.json(response);
			})
			.catch(err => {
				console.log("Error Listando Proveedores " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Listando Proveedores. " + err
				}
				return res.json(response);
			});
  },
  search : function(req, res, next){
		const data = {
		val1: req.body.nit
		};
		dataProviders
			.searchProvider(data)
			.then(provider => {
				if(provider.rows.length>0){
					console.log("Proveedor: ", provider.rows[0]);
					let response = {
						status: true,
						code: 200,
						content: provider.rows[0]
					}
					res.json(response);
				}else{
					console.log("El Proveedor no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Proveedor no existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Consultando Proveedor " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Consultando Proveedor. " + err
				}
				return res.json(response);
			});
  },
	update : function(req, res, next){

        const {idprovider, name, address, phone, mobile, email, contact, website} =req.body
        const valores = {
            val1: idprovider,
            val2: name,
            val3: address,
            val4: phone,
            val5: mobile,
            val6: email,
            val7: contact,
            val8: website
        };


		
		dataProviders
			.updateProvider(valores)
			.then(provider => {
				if(provider.rowCount>0){
					console.log("Proveedor Actualizado correctamente");
					let response = {
						status: true,
						code: 200,
						content: "Proveedor Actualizado correctamente"
					}
					res.json(response);
				}else{
					console.log("El Proveedor no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Proveedor no existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Actualizando Proveedor " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Actualizando Proveedor. " + err
				}
				return res.json(response);
			});
	},
	delete : function(req, res, next){
		const id = req.params.id;
		dataProviders
			.deleteProvider(id)
			.then(provider => {
				if(provider.rowCount>0){
					console.log("Proveedor Eliminado correctamente");
					let response = {
						status: true,
						code: 200,
						content: "Proveedor Eliminado correctamente"
					}
					res.json(response);
				}else{
					console.log("El Proveedor no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Proveedor no existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Eliminando Proveedor " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Eliminando Proveedor. " + err
				}
				return res.json(response);
			});
	}

} // Fin module.exports