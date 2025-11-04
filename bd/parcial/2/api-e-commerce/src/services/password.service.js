import bcrypt from 'bcrypt'

export const encryptPass=async(contrasena)=>{
    return bcrypt.hash(contrasena,10)
}

export const validatePass = async (contrasena, hash) => {
 return bcrypt.compare(contrasena,hash)   
}