import conexion from '../database/database'

module.exports = {
  
	async addProvider({val1,val2,val3,val4,val5,val6,val7,val8}) {


		const verifity = await conexion.query("SELECT * FROM providers where nit=($1)",
		[val1]);
		if(verifity.rows.length>0){
			const resp = {
				status: false,
				content: verifity.rows[0]
			}
			return resp;
		}else{
			let name = val2.toUpperCase();
			let address = val3.toUpperCase();
			let contact = val7.toUpperCase();
			let providers = await conexion.query("INSERT INTO providers (nit,name,address,phone,mobile,email,contact,website) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
			[val1,name,address,val4,val5,val6,contact,val8]);
			const resp = {
				status: true,
				content: providers
			}
			return resp;
		}
	},
	
	async listProvider() {
		const list = await conexion.query("SELECT * FROM providers");
		return list;
	},

	async searchProvider(valores) {
		const provider = await conexion.query("SELECT * FROM providers where nit=($1)",
		[valores.val1]);
		return provider;
	},
	
	async updateProvider({val1,val2,val3,val4,val5,val6,val7,val8}) {
		let name = val2.toUpperCase();
		let address = val3.toUpperCase();
		let contact = val7.toUpperCase();
		let provider = await conexion.query("UPDATE providers SET name=($1),address=($2),phone=($3),mobile=($4),email=($5),contact=($6),website=($7) WHERE idprovider=($8)",
		[name,address,val4,val5,val6,contact,val8,val1]);
		return provider;
	},

	async deleteProvider(id) {
		let provider = await conexion.query("DELETE FROM providers WHERE idprovider = ($1)",
		[id]);
		return provider;
	}
	
} // Fin module.exports