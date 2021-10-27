
import { valores } from "../models/const";
import UserData from '../models/modUsers'

export const checkDuplicateUserNameOrEmail = async (req, res, next) =>{

    console.log(req.body.email)
    const email = await UserData.searchSignin(req.body.email);
    if(email) return res.status(400).json({message:'El Email ya existe'})

    next()
}


export const checkProfilesExisted = async (req, res, next)=>{

    //se verifica que el perfil exista en los registros
    if (!valores.includes(req.body.idperfil)) {
        return res.status(401).json({
            message: `Perfil no existe`
        })
    }

    next()

}