import conexion from '../database/database'

module.exports = {
  
	async addClient(data) {
		const {val1, val2, val3, val4, val5, val6} = data

		let verifity = await conexion.query("SELECT * FROM clients where dni=($1)",
		[val1]);
		if(verifity.rows.length>0){
			let resp = {
				status: false,
				content: verifity.rows[0]
			}
			return resp;
		}else{
			let name = val2.toUpperCase();
			let address = val3.toUpperCase();
			let clients = await conexion.query("INSERT INTO clients (dni,nameclient,address,phone,mobile,email) VALUES ($1,$2,$3,$4,$5,$6)",
			[val1,name,address,val4,val5,val6]);
			let resp = {
				status: true,
				content: clients
			}
			return resp;
		}
	},
	
	async listClient() {
		let list = await conexion.query("SELECT * FROM clients");
		return list;
	},

	async searchClient({val1}) {
		let clients = await conexion.query("SELECT * FROM clients where dni=($1)",
		[val1]);
		return clients;
	},

	async updateClient(data) {

		const {val1, val2, val3, val4, val5, val6} = data 
		let name = val2.toUpperCase();
		let address = val3.toUpperCase();
		let clients = await conexion.query("UPDATE clients SET nameclient=($1),address=($2),phone=($3),mobile=($4),email=($5) WHERE idclient=($6)",
		[name,address,val4,val5,val6,val1]);
		return clients;
	},

	async deleteClient(id) {

		let clients = await conexion.query("DELETE FROM clients WHERE idClient = ($1)",
		[id]);
		return clients;
	}
	
} // Fin module.exports