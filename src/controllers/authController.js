import dataUsers from '../models/modUsers'
import jwt from 'jsonwebtoken'
import config from '../config'

module.exports = {

    signin : function(req, res, next){

        const {email, password} = req.body
		const data = {
			val1: email
		};
    	dataUsers
			.searchSignin(data)
			.then(result => {

				if(result.rows.length>0){
					console.log("Usuario: ", result.rows[0]);
                    
                    const verify = {
                        val1:password.toString(),
                        val2: result.rows[0].password
                    }

                    dataUsers
                        .comparePassword(verify).then(matchPassword=>{
                            if(!matchPassword) return res.status(401).json({token:null, message: 'clave invalida'})


							const token =jwt.sign({id:result.rows[0].dni}, config.SECRET,{
								expiresIn:86400// 24 hour
							})

							res.json({token})


                        })
				}else{

                    return res.status(201).json({message: 'Usuario no encontrado'})

				}
			})
			.catch(err => {

                return res.status(500).json({message: 'Error Consultando Usuario.'+err})

			});
  }

} // Fin module.exports