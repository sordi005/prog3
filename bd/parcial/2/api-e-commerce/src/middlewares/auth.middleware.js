import { verifyToken } from '../services/auth.service.js'
export const validateToken = (req, res, next) => {
    try {
        console.info("Iniciando validación de token");

        const authHeader = req.headers['authorization']
        
        if(!authHeader){
            console.error("No se proporcionó el header authorization")
            return res.status(401).json({message:'Token no proporcionado'})
        }

        let token = authHeader.trim()
        
        if(token.toLowerCase().startsWith('bearer ')){
            token = token.split(" ")[1]
        }
        
        if(!token){
            console.error("Token está vacío después del split")
            return res.status(401).json({message:'Token no proporcionado'})
        }

        const decoded = verifyToken(token)
        console.info("Token decodificado exitosamente")
        
        req.user = decoded
        next()
    
    } catch (error) {
        console.error("Error al validar el token:", error.message)
        return res.status(401).json({
            message: 'Token inválido',
            error: error.message
        })
    }
}

export const isAdmin = (req, res, next) => {
    
    console.info("Iniciando proceso de verificación de rol de admin");

    if(!req.user){
        return res.status(401).json({message:'Usuario no autenticado'})
    }

    if(req.user.rol !== 'admin'){
        return res.status(403).json({
            message:'Acceso denegado, se requiere rol de admin',
            rol: req.user.rol
        })
    }

    console.info("Usuario es admin");
    next()
}

export const isUser = (req, res, next) => {
    console.info("Iniciando proceso de verificación de rol de user");
    if(!req.user){
        console.warn("Usuario no autenticado");
        return res.status(401).json({message:'Usuario no autenticado'})
    }

    if(req.user.rol !== 'user' && req.user.rol !== 'admin'){
        console.warn("No tiene rol de user ni admin");
        return res.status(403).json({
            message:'Acceso denegado',
            tuRol: req.user.rol
        })
    }
    
    next()
}