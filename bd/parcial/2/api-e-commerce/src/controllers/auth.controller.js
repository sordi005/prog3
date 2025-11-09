import { User } from "../models/user.js"
import { generateToken } from "../services/auth.service.js"
import { validatePass,encryptPass } from "../services/password.service.js"

export const login = async (req, res) => {
    try {

        const {email, contrasena} = req.body

        if(!email || !contrasena){
            return res.status(400).json({message:'Email y contraseña requeridos'})
        }

        console.log("Iniciando proceso de login para email:", email);

        // Buscar usuario
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'})
        }

        // Validar contraseña
        const isValid = await validatePass(contrasena, user.contrasena)
        if(!isValid){
            return res.status(401).json({message:'Contraseña incorrecta'})
        }

        const userResponse = {
            id: user._id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
        }
        const token = generateToken(userResponse)

        console.log("Login Exitoso para id:", user._id);

        return res.status(201).json({
            user: userResponse,
            token
        })

    } catch (error) {
        console.error("Error en login: ", error);
        return res.status(500).json({message:`Error: ${error.message}`})
    }
}

export const register = async (req, res) => {
    try {

        const {nombre, edad, email, contrasena } = req.body

        console.log("Iniciando proceso de registro para email:", email);


        if(!nombre || !edad || !email || !contrasena){
            console.warn("Parámetros incompletos en registro:", req.body);
            return res.status(400).json({message:'Faltan parámetros requeridos'})
        }

        if(nombre.length < 3 || nombre.length > 50){
            return res.status(400).json({message:'El nombre debe tener al menos 3 caracteres'})
        }

        if(/[0-9]/.test(nombre)){
            return res.status(400).json({message:'El nombre no puede contener números'})
        }

        if(edad < 0){
            return res.status(400).json({message:'La edad no puede ser negativa'})
        }

        if(contrasena.length < 6){
            return res.status(400).json({message:'La contraseña debe tener al menos 6 caracteres'})
        }


       

        console.log("Verificando si el email ya existe:", email);
        // Verificar si el email ya existe
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:'El email ya está registrado'})
        }

        const hashedPassword = await encryptPass(contrasena)

        const newUser = new User({
            nombre,
            edad,
            email,
            contrasena: hashedPassword,
            rol: 'user'
        })

        await newUser.save()

        const userResponse = {
            id: newUser._id,
            nombre: newUser.nombre,
            email: newUser.email,
            rol: newUser.rol
        }
        const token = generateToken(userResponse)

        return res.status(201).json({
            user: userResponse,
            token
        })

    } catch (error) {
        console.error("Error en registro: ", error);
        return res.status(500).json({message:`Error: ${error.message}`})
    }
}

