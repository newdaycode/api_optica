import dataProducts from '../models/modProducts'

module.exports = {

	create : function(req, res, next){

        const { code, name, description, features, stock, price, storagelocation, production,productiontime, idprovider} = req.body
        const data = {
            val1: code,
            val2: name,
            val3: description,
            val4: features,
            val5: stock,
            val6: price,
            val7: storagelocation,
            val8: production,
            val9: productiontime,
            val10: idprovider
        };
		dataProducts
			.addProduct(data)
			.then(product => {
				if(product.status){
					console.log("Producto registrado correctamente", product);
					let response = {
						status: true,
						code: 200,
						content: "Producto registrado correctamente"
					}
					res.json(response);
				}else{
					console.log("El Producto ya Existe", product);
					let response = {
						status: true,
						code: 200,
						content: "El Producto ya Existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Registrando Producto " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Registrando Producto. " + err
				}
				return res.json(response);
			});
	},
	list : function(req, res, next){
		dataProducts
			.listProduct()
			.then(result => {
				console.log("Productos: ", result.rows);
				let response = {
					status: true,
					code: 200,
					content: result.rows
				}
				res.json(response);
			})
			.catch(err => {
				console.log("Error Listando Productos " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Listando Productos. " + err
				}
				return res.json(response);
			});
  },
  search : function(req, res, next){
    const data = {
      val1: req.body.code
    };
		dataProducts
			.searchProduct(data)
			.then(product => {
				if(product.rows.length>0){
					console.log("Producto: ", product.rows[0]);
					let response = {
						status: true,
						code: 200,
						content: product.rows[0]
					}
					res.json(response);
				}else{
					console.log("El Producto no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Producto no existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Consultando Producto " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Consultando Producto. " + err
				}
				return res.json(response);
			});
  },
	update : function(req, res, next){
    const valores = {
      val1: req.body.idproduct,
      val2: req.body.name,
      val3: req.body.description,
      val4: req.body.features,
      val5: req.body.stock,
			val6: req.body.price,
			val7: req.body.storagelocation,
			val8: req.body.production,
			val9: req.body.productiontime
    };
		dataProducts
			.updateProduct(valores)
			.then(product => {
				if(product.rowCount>0){
					console.log("Producto Actualizado correctamente");
					let response = {
						status: true,
						code: 200,
						content: "Producto Actualizado correctamente"
					}
					res.json(response);
				}else{
					console.log("El Producto no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Producto no existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Actualizando Producto " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Actualizando Producto. " + err
				}
				return res.json(response);
			});
	},
	delete : function(req, res, next){
    const id = req.body.idproduct;
		dataProducts
			.deleteProduct(id)
			.then(product => {
				if(product.rowCount>0){
					console.log("Producto Eliminado correctamente");
					let response = {
						status: true,
						code: 200,
						content: "Producto Eliminado correctamente"
					}
					res.json(response);
				}else{
					console.log("El Producto no existe");
					let response = {
						status: false,
						code: 200,
						content: "El Producto no existe"
					}
					res.json(response);
				}
			})
			.catch(err => {
				console.log("Error Eliminando Producto " + err);
				let response = {
					status: false,
					code: 500,
					content: "Error Eliminando Producto. " + err
				}
				return res.json(response);
			});
	}

} // Fin module.exports