import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.DB_NAME
        })
        console.log("Conectado correctamente a la base de datos")
        console.log(`Base de datos: ${process.env.DB_NAME}`)
    } catch (error) {
        console.error(`Error al conectarse a la base de datos: ${error.message}`)
        process.exit(1)
    }
}

mongoose.connection.on('disconnected', () => {
    console.log(' MongoDB desconectado')
})

mongoose.connection.on('error', (error) => {
    console.error('Error en MongoDB:', error.message)
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('Conexión a MongoDB cerrada')
    process.exit(0)
})