import { User } from "../models/user.js"
import { encryptPass } from "../services/password.service.js"
import { generateToken } from "../services/auth.service.js"

// ================== ADMIN ===================

export const getAllUsers = async (req, res) => {
    try {
        console.log("Iniciando proceso de obtención de todos los usuarios");
        const users = await User.find().select('-contrasena')
        if(users.length === 0){
            console.warn("No se encontraron usuarios");
            return res.status(204).json([])
        }
        res.status(200).json(users)
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({message:`Error: ${error.message}`})
    }
}

export const getUserById = async (req, res) => {
    try {
        console.log("Iniciando proceso de obtención de usuario por ID:", req.params.id);
        const {id} = req.params
        const user = await User.findById(id).select('-contrasena')
        if(!user){
            console.warn("Usuario no encontrado por ID:", id);
            return res.status(404).json({message:'Usuario no encontrado'})
        }
        console.log("Usuario encontrado con id : ", id);
        return res.status(200).json(user)
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        return res.status(500).json({message:`Error: ${error.message}`})
    }
}

export const createUser = async (req, res) => {
    try {

        console.info("Creando un nuevo usuario con datos:", req.body);

        const {nombre, edad, email, contrasena, rol} = req.body

        if(!nombre || !edad || !email || !contrasena || !rol){
            console.warn("Parámetros incompletos para crear usuario:", req.body);
            return res.status(400).json({message:'Faltan parámetros requeridos'})
        }


        const rolLimpio = rol.toLowerCase().trim()

        if(rolLimpio !== 'admin' && rolLimpio !== 'user'){
            console.warn("Rol inválido proporcionado:", rol);
            return res.status(400).json({message:'El rol debe ser admin o user'})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            console.warn("El email ya está registrado:", email);
            return res.status(400).json({message:'El email ya está registrado'})
        }

        const hashedPassword = await encryptPass(contrasena)

        const newUser = new User({
            nombre,
            edad,
            email,
            contrasena: hashedPassword,
            rol: rolLimpio
        })

        await newUser.save()

        const userResponse = {
            id: newUser._id,
            nombre: newUser.nombre,
            email: newUser.email,
            edad: newUser.edad,
            rol: newUser.rol
        }

        const token = generateToken(userResponse)

        console.info("Usuario creado con éxito:", userResponse);
        return res.status(201).json({
            user: userResponse,
            token,
        })

    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({message:`Error: ${error.message}`})
    }
}


export const deleteUser = async (req, res) => {
    try {
        console.info("Iniciando proceso de eliminación de usuario con ID:", req.params.id);
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        if(!user){
            console.warn("Usuario no encontrado para eliminación con ID:", id);
            return res.status(404).json({message:'Usuario no encontrado'})
        }
        console.info("Usuario eliminado con éxito con ID:", id);
        return res.status(204).json()
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return res.status(500).json({message:`Error: ${error.message}`})
    }
}


export const getUserStats = async (req, res) => {
    try {
        console.info("Iniciando proceso de obtención de estadísticas de usuarios");
        const stats = await User.aggregate([
            {
                $group: {
                    _id: null,
                    edadPromedio: {$avg: "$edad"},
                    edadMax: {$max: "$edad"},
                    edadMin: {$min: "$edad"},
                    totalUsuarios: {$sum: 1}
                }
            }
        ])
        console.info("Estadísticas de usuarios obtenidas con éxito");
        return res.status(200).json(stats[0] || {})
    } catch (error) {
        console.error("Error al obtener estadísticas de usuarios:", error);
        return res.status(500).json({message:`Error: ${error.message}`})
    }
}



// ==================  usuario y admin ===================
export const getProfile = async (req, res) => {
    try {
        console.info("Iniciando proceso de obtención de perfil de usuario");

        //se excluye contraseña por temas de seguridad
        const user = await User.findById(req.user.id).select('-contrasena')
        
        if(!user){
            console.warn("Usuario no encontrado para obtención de perfil con ID:", req.user.id);
            return res.status(404).json({message:'Usuario no encontrado'})
        }
        console.info("Perfil de usuario obtenido con éxito para ID:", req.user.id);
        return res.status(200).json(user)
    } catch (error) {
        console.error("Error al obtener perfil de usuario:", error);
        return res.status(500).json({message:`Error: ${error.message}`})
    }
}

export const updateUser = async (req, res) => {
    try {
        console.info("Iniciando proceso de actualización de usuario con ID:", req.params.id)
        const { id } = req.params
        const { nombre, edad, email, contrasena } = req.body
        
        const updates = {}
        if (nombre !== undefined) updates.nombre = nombre
        if (edad !== undefined) updates.edad = edad
        if (email !== undefined) {
            const existingUser = await User.findOne({ email, _id: { $ne: id } })
            if (existingUser) {
                return res.status(400).json({ message: 'El email ya está en uso' })
            }
            updates.email = email
        }
        
        if (contrasena) {
            updates.contrasena = await encryptPass(contrasena)
        }
                
        const user = await User.findByIdAndUpdate(
            id,
            updates,
            { 
                new: true,
                runValidators: true
            }
        ).select('-contrasena')
        
        if (!user) {
            console.warn("Usuario no encontrado para actualización con ID:", id)
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        
        console.info("Usuario actualizado con éxito:", id)
        return res.status(200).json(user)
        
    } catch (error) {
        console.error("Error al actualizar usuario:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}