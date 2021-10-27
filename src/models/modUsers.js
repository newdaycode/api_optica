import conexion from '../database/database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config'

module.exports = {
  
	async addUser(dat) {

		const {val1, val2,val3,val4,val5,val6,val7,val8,val9,val10} = dat

		let verifity = await conexion.query("SELECT * FROM users where dni=($1)",
		[val1]);
		if(verifity.rows.length>0){
			let resp = {
				status: false,
				content: verifity.rows[0]
			}
			return resp;
		}else{
			let names = val2.toUpperCase();
			let surnames = val3.toUpperCase();
			let address = val4.toUpperCase();
			let users = await conexion.query("INSERT INTO users (dni,names,surnames,address,phone,mobile,email) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING iduser",
			[val1,names,surnames,address,val5,val6,val7]);
			const { iduser } = users.rows[0];
			console.log("Id user: ", iduser)
			let valPas = val9.toString();
			var salt = bcrypt.genSaltSync(5);
			var password = bcrypt.hashSync(valPas, salt);
						
			let accounts = await conexion.query("INSERT INTO accounts (username,password,idprofile,iduser) VALUES ($1,$2,$3,$4)",
			[val8,password,val10,iduser]);

			const token = jwt.sign({id:val1}, config.SECRET,{
				expiresIn:86400// 24 hour
			} )

			let resp = {
				token: token,
				status: true,
				content: users
			}
			return resp;
		}
	},
	
	async listUser() {
		let list = await conexion.query("SELECT * FROM users");
		return list;
	},

	async searchUser({val1}) {
		let clients = await conexion.query("SELECT * FROM users where dni=($1)",
		[val1]);
		return clients;
	},

	async searchSignin({val1}) {
		let clients = await conexion.query("SELECT * FROM users inner join accounts on users.iduser=accounts.iduser inner join profiles on profiles.idprofile=accounts.idprofile where email=($1)",
		[val1]);
	
		return clients;
	},
	
	async updateUser(dat) {

		const {val2,val3,val4,val5,val6,val7} = dat
		let names = val2.toUpperCase();
		let surnames = val3.toUpperCase();
		let address = val4.toUpperCase();
		let user = await conexion.query("UPDATE users SET names=($1),surnames=($2),address=($3),phone=($4),mobile=($5),email=($6) WHERE iduser=($7)",
		[names,surnames,address,val5,val6,val7,val1]);
		return user;
	},

	async deleteUser(id) {
		let accounts = await conexion.query("DELETE FROM accounts WHERE iduser=($1)",
		[id]);
		let user = await conexion.query("DELETE FROM users WHERE iduser=($1)",
		[id]);
		return user;
	},

	async comparePassword({val1, val2}) {

		return await bcrypt.compare(val1, val2)
	},


	
} // Fin module.exports