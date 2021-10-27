import  jwt  from "jsonwebtoken";
import config from '../config'
import UserData from '../models/modUsers'
import UserProfile from '../models/modProfiles'

export const verifyToken = async (req, res, next)=>{

    try {

        const token= req.headers["x-access-token"];

        if(!token) return res.status(403).json({message: 'No se ha proporcionado ningún token'})
        
        const decoded = jwt.verify(token, config.SECRET, config.algorithms)
        req.userId = decoded.id 
        const data = {
            val1: req.userId
        }

        const user = await UserData.searchUser(data);
        if(!user) return res.status(404).json({message:'EL usuario no existe'})
    
        next()

        
    } catch (error) {
        return res.status(401).json({message:'Usuario no Autorizado'})
    }    
};


export const isAdmin = async (req, res, next)=>{

    const data = {
        val1: req.userId
    }

    const user = await UserData.searchUser(data);
    const profile = await UserProfile.Profile(user.rows[0].iduser);
    
    const prof = profile.rows[0].profile

    if (prof == 'admin') {
        next()
    }else{
        return res.status(401).json({message:'Requiere permiso de administrador'})
    }
    
}

export const isUser = async (req, res, next)=>{

    const data = {
        val1: req.userId
    }

    const user = await UserData.searchUser(data);
    const profile = await UserProfile.Profile(user.rows[0].iduser);

    console.log(profile.rows[0].profile)
    const prof = profile.rows[0].profile

    if (prof == 'user' || prof == 'user') {
        next()
    }else{
        return res.status(401).json({message:'Requiere permiso de usuario'})
    }
    
}