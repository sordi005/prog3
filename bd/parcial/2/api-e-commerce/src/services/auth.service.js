import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET||"default"

export const generateToken =(userResponse)=>{

    console.log("Generando token para usuario: ", userResponse.email);

    const user = {
        id:userResponse.id,
        nombre:userResponse.nombre,
        email:userResponse.email,
        rol:userResponse.rol
    }


    const token = jwt.sign(user,secret,{expiresIn:'7d'})
    console.log("Token generado: ", token);

    return token 
}   

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret)
        return decoded
    } catch (error) {
        throw new Error(`Token inválido: ${error.message}`)
    }
}

