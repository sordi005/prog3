import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET||"default"

export const generateToken =(userResponse)=>{

    console.log("Generando token para usuario: ", userResponse.email);

    const datos = {
        id:userResponse.id,
        nombre:userResponse.nombre,
        email:userResponse.email,
        rol:userResponse.rol
    }


    const token = jwt.sign(datos,secret,{expiresIn:'24h'})
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

export const verifyTokenAsync = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(new Error(`Token inválido: ${err.message}`))
            } else {
                resolve(decoded)
            }
        })
    })
}