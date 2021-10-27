import conexion from '../database/database'

module.exports = {
  
	async addProduct(v) {
		let code = v.val1.toUpperCase();
		var verifity = await conexion.query("SELECT * FROM products where code=($1)",
		[code]);
		if(verifity.rows.length>0){
			var resp = {
				status: false,
				content: verifity.rows[0]
			}
			return resp;
		}else{
			let code = v.val1.toUpperCase();
			let name = v.val2.toUpperCase();
			let description = v.val3.toUpperCase();
			let features = v.val4.toUpperCase();
			let location = v.val7.toUpperCase();
			let products = await conexion.query("INSERT INTO products (code,name,description,features,stock,price,storagelocation,production,productiontime,idprovider) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
			[code,name,description,features,v.val5,v.val6,location,v.val8,v.val9,v.val10]);
			var resp = {
				status: true,
				content: products
			}
			return resp;
		}
	},
	
	async listProduct() {
		const list = await conexion.query("SELECT * FROM products");
		return list;
	},

	async searchProduct(v) {
		let code = v.val1.toUpperCase();
		var product = await conexion.query("SELECT * FROM products where code=($1)",
		[code]);
		return product;
	},
	
	async updateProduct(v) {
		let name = v.val2.toUpperCase();
		let description = v.val3.toUpperCase();
		let features = v.val4.toUpperCase();
		let location = v.val7.toUpperCase();
		let product = await conexion.query("UPDATE products SET name=($1),description=($2),features=($3),stock=($4),price=($5),storagelocation=($6),production=($7),productiontime=($8) WHERE idproduct=($9)",
		[name,description,features,v.val5,v.val6,location,v.val8,v.val9,v.val1]);
		return product;
	},

	async deleteProduct(id) {
		let product = await conexion.query("DELETE FROM products WHERE idproduct = ($1)",
		[id]);
		return product;
	}
	
} // Fin module.exports