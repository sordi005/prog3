import express from "express"
import { connectDB } from "./config/database.js"
import { userRoutes } from "./routes/user.routes.js"
import { authRoutes } from "./routes/auth.routes.js"
import { initializeData } from "./config/data.initializer.js"
import { productoRoutes } from "./routes/producto.route.js"
import { categoriaRoutes } from "./routes/categorias.routes.js"

const app = express()

app.use(express.json())

await connectDB()
await initializeData()

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/productos", productoRoutes)
app.use("/categorias", categoriaRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutando en el puerto ${process.env.PORT}`)
})
