import express from "express"
import { connectDB } from "./config/database.js"
import { userRoutes } from "./routes/user.routes.js"
import { authRoutes } from "./routes/auth.routes.js"
import { initializeData } from "./config/data.initializer.js"
import { productoRoutes } from "./routes/producto.route.js"
import { categoriaRoutes } from "./routes/categorias.routes.js"
import { carritoRoutes } from "./routes/carrito.routes.js"
import { orderRoutes } from "./routes/order.routes.js"
import resenaRoutes from "./routes/resena.routes.js"

const app = express()

app.use(express.json())

await connectDB()
await initializeData()

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/productos", productoRoutes)
app.use("/api/categorias", categoriaRoutes)
app.use("/api/carritos", carritoRoutes)
app.use("/api/ordenes", orderRoutes)
app.use("/api/resenas", resenaRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutando en el puerto ${process.env.PORT}`)
})
