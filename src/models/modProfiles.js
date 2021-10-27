import conexion from '../database/database'

module.exports = {
	
	async listProfiles() {
		let list = await conexion.query("SELECT * FROM profiles");
		return list;
	},


	async dataProfilesMulti() {
		let profiles = await conexion.query("INSERT INTO profiles (name, description, profile) VALUES ('admin','Registro total del sistema', 'admin'), ('user','solo lectura del sistema', 'user')");

		return profiles;
	},

	async Profile(val1) {
		let profile = await conexion.query("SELECT * FROM accounts inner join profiles on profiles.idprofile=accounts.idprofile where iduser=($1)",
		[val1]);
	
		return profile;
	},
	
} // Fin module.exports