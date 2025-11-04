import { User } from "../models/user.js"
import {  encryptPass } from "../services/password.service.js"

export const initializeData = async () => {
    try {
        console.log("Verificando datos iniciales...")

        const adminExists = await User.findOne({ email: "admin@example.com" })
        
        if (!adminExists) {
            const admin = new User({
                nombre: "Admin",
                edad: 30,
                email: "admin@example.com",
                contrasena: await encryptPass("admin123"),
                rol: "admin"
            })
            await admin.save()
            console.log("Admin creado: admin@example.com / admin123")
        } else {
            console.log("Admin ya existe")
        }

        const userExists = await User.findOne({ email: "user@example.com" })
        
        if (!userExists) {
            const user = new User({
                nombre: "User",
                edad: 25,
                email: "user@example.com",
                contrasena: await encryptPass("user123"),
                rol: "user"
            })
            await user.save()
            console.log("User creado: user@example.com / user123")
        } else {
            console.log("User ya existe")
        }

        console.log("Datos iniciales verificados correctamente")

    } catch (error) {
        console.error("Error al inicializar datos:", error.message)
    }
}
