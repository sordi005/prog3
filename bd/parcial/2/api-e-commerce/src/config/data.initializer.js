import { Categoria } from "../models/categoria.js"
import { Producto } from "../models/producto.js"
import { User } from "../models/user.js"
import { Resena } from "../models/resena.js"
import { Carrito } from "../models/carritos.js"
import { Pedido } from "../models/pedidos.js"
import { encryptPass } from "../services/password.service.js"

export const initializeData = async () => {
    try {
        console.log("Verificando datos iniciales...")

        // Crear usuarios con todos los campos requeridos
        const admin = await crearUsuarioSiNoExiste({
            nombre: "Admin User",
            edad: 30,
            email: "admin@example.com",
            contrasena: "admin123",
            rol: "admin"
            // Nota: El modelo actual no tiene dirección ni teléfono
        })

        const user1 = await crearUsuarioSiNoExiste({
            nombre: "Juan Pérez",
            edad: 25,
            email: "juan@example.com",
            contrasena: "user123",
            rol: "user"
        })

        const user2 = await crearUsuarioSiNoExiste({
            nombre: "María García",
            edad: 28,
            email: "maria@example.com",
            contrasena: "user123",
            rol: "user"
        })

        // Crear categorías
        const categorias = await Promise.all([
            crearCategoriaSiNoExiste("Electrónicos", "Dispositivos electrónicos y accesorios"),
            crearCategoriaSiNoExiste("Ropa", "Prendas de vestir para todas las edades"),
            crearCategoriaSiNoExiste("Hogar", "Artículos para el hogar y decoración")
        ])

        // Crear productos (3 por categoría) con nombres más descriptivos y marcas
        const productosElectronicos = await Promise.all([
            crearProductoSiNoExiste("Laptop Gaming", "Laptop de alta gama para gaming", "ASUS", 1500, categorias[0]._id, 20),
            crearProductoSiNoExiste("Smartphone Pro", "Teléfono inteligente última generación", "Samsung", 800, categorias[0]._id, 35),
            crearProductoSiNoExiste("Auriculares Bluetooth", "Auriculares inalámbricos con cancelación de ruido", "Sony", 200, categorias[0]._id, 50)
        ])

        const productosRopa = await Promise.all([
            crearProductoSiNoExiste("Camisa Formal", "Camisa formal de algodón 100%", "Polo Ralph Lauren", 80, categorias[1]._id, 40),
            crearProductoSiNoExiste("Jeans Premium", "Jeans de mezclilla premium", "Levi's", 120, categorias[1]._id, 30),
            crearProductoSiNoExiste("Zapatillas Deportivas", "Zapatillas para running profesional", "Nike", 150, categorias[1]._id, 25)
        ])

        const productosHogar = await Promise.all([
            crearProductoSiNoExiste("Cafetera Automática", "Cafetera programable con molinillo", "DeLonghi", 300, categorias[2]._id, 15),
            crearProductoSiNoExiste("Set de Toallas", "Set de 6 toallas de baño premium", "Cannon", 100, categorias[2]._id, 40),
            crearProductoSiNoExiste("Lámpara LED", "Lámpara de escritorio LED regulable", "Philips", 50, categorias[2]._id, 60)
        ])

        const productos = [...productosElectronicos, ...productosRopa, ...productosHogar]

        // Crear reseñas variadas (mínimo 3 por producto)
        const comentarios = [
            { texto: "Excelente producto, lo recomiendo ampliamente", calif: 5 },
            { texto: "Muy buena calidad, cumple con lo prometido", calif: 4 },
            { texto: "Buen producto pero algo caro para lo que ofrece", calif: 3 },
            { texto: "Superó mis expectativas, muy satisfecho", calif: 5 },
            { texto: "Regular, esperaba un poco más", calif: 3 },
            { texto: "Perfecto, justo lo que necesitaba", calif: 5 }
        ]

        // Crear pedidos para usuarios para poder crear reseñas
        const pedidoAdmin = await crearPedidoSiNoExiste(admin._id, [
            { productoId: productos[0]._id, nombre: productos[0].nombre, precio: productos[0].precio, cantidad: 1, subtotal: productos[0].precio },
            { productoId: productos[3]._id, nombre: productos[3].nombre, precio: productos[3].precio, cantidad: 2, subtotal: productos[3].precio * 2 },
            { productoId: productos[6]._id, nombre: productos[6].nombre, precio: productos[6].precio, cantidad: 1, subtotal: productos[6].precio }
        ], "entregado")

        const pedidoUser1 = await crearPedidoSiNoExiste(user1._id, [
            { productoId: productos[1]._id, nombre: productos[1].nombre, precio: productos[1].precio, cantidad: 1, subtotal: productos[1].precio },
            { productoId: productos[4]._id, nombre: productos[4].nombre, precio: productos[4].precio, cantidad: 1, subtotal: productos[4].precio },
            { productoId: productos[7]._id, nombre: productos[7].nombre, precio: productos[7].precio, cantidad: 2, subtotal: productos[7].precio * 2 }
        ], "entregado")

        const pedidoUser2 = await crearPedidoSiNoExiste(user2._id, [
            { productoId: productos[2]._id, nombre: productos[2].nombre, precio: productos[2].precio, cantidad: 1, subtotal: productos[2].precio },
            { productoId: productos[5]._id, nombre: productos[5].nombre, precio: productos[5].precio, cantidad: 1, subtotal: productos[5].precio },
            { productoId: productos[8]._id, nombre: productos[8].nombre, precio: productos[8].precio, cantidad: 3, subtotal: productos[8].precio * 3 }
        ], "enviado")

        // Crear reseñas solo para productos comprados
        await crearResenaSiNoExiste(admin._id, productos[0]._id, comentarios[0].texto, comentarios[0].calif)
        await crearResenaSiNoExiste(admin._id, productos[3]._id, comentarios[1].texto, comentarios[1].calif)
        await crearResenaSiNoExiste(admin._id, productos[6]._id, comentarios[3].texto, comentarios[3].calif)

        await crearResenaSiNoExiste(user1._id, productos[1]._id, comentarios[2].texto, comentarios[2].calif)
        await crearResenaSiNoExiste(user1._id, productos[4]._id, comentarios[4].texto, comentarios[4].calif)
        await crearResenaSiNoExiste(user1._id, productos[7]._id, comentarios[5].texto, comentarios[5].calif)

        await crearResenaSiNoExiste(user2._id, productos[2]._id, comentarios[1].texto, comentarios[1].calif)
        await crearResenaSiNoExiste(user2._id, productos[5]._id, comentarios[3].texto, comentarios[3].calif)
        await crearResenaSiNoExiste(user2._id, productos[8]._id, comentarios[0].texto, comentarios[0].calif)

        // Crear carritos activos
        await crearCarritoSiNoExiste(admin._id, [
            { productoId: productos[1]._id, cantidad: 2 },
            { productoId: productos[4]._id, cantidad: 1 }
        ])

        await crearCarritoSiNoExiste(user1._id, [
            { productoId: productos[0]._id, cantidad: 1 },
            { productoId: productos[5]._id, cantidad: 2 },
            { productoId: productos[8]._id, cantidad: 1 }
        ])

        await crearCarritoSiNoExiste(user2._id, [
            { productoId: productos[2]._id, cantidad: 3 },
            { productoId: productos[6]._id, cantidad: 1 }
        ])

        // Crear pedidos pendientes adicionales
        await crearPedidoAdicional(user1._id, [
            { productoId: productos[3]._id, nombre: productos[3].nombre, precio: productos[3].precio, cantidad: 1, subtotal: productos[3].precio }
        ], "pendiente")

        console.log("✅ Todos los datos iniciales creados correctamente")
        console.log("📊 Resumen de datos creados:")
        console.log(`   - 3 usuarios (1 admin, 2 users)`)
        console.log(`   - 3 categorías`)
        console.log(`   - 9 productos (3 por categoría)`)
        console.log(`   - 9 reseñas (productos comprados)`)
        console.log(`   - 3 carritos activos`)
        console.log(`   - 4 pedidos (3 entregados/enviados, 1 pendiente)`)

    } catch (error) {
        console.error("❌ Error al inicializar datos:", error.message)
        console.error(error)
    }
}

// Funciones auxiliares
async function crearUsuarioSiNoExiste(datos) {
    let usuario = await User.findOne({ email: datos.email })
    if (!usuario) {
        usuario = new User({
            ...datos,
            contrasena: await encryptPass(datos.contrasena)
        })
        await usuario.save()
        console.log(`Usuario creado: ${datos.email} / ${datos.contrasena}`)
    }
    return usuario
}

async function crearCategoriaSiNoExiste(nombre, descripcion) {
    let categoria = await Categoria.findOne({ nombre })
    if (!categoria) {
        categoria = new Categoria({ nombre, descripcion })
        await categoria.save()
        console.log(`Categoría creada: ${nombre}`)
    }
    return categoria
}

async function crearProductoSiNoExiste(nombre, descripcion, marca, precio, categoriaId, stock) {
    let producto = await Producto.findOne({ nombre })
    if (!producto) {
        producto = new Producto({ 
            nombre, 
            descripcion,
            precio, 
            categoriaId, 
            stock: stock || 50
        })
        await producto.save()
        console.log(`Producto creado: ${nombre} - Marca: ${marca} (Stock: ${stock})`)
    }
    return producto
}

async function crearResenaSiNoExiste(usuarioId, productoId, comentario, calificacion) {
    const existe = await Resena.findOne({ usuarioId, productoId })
    if (!existe) {
        const resena = new Resena({ 
            usuarioId, 
            productoId, 
            comentario, 
            calificacion 
        })
        await resena.save()
        console.log(`Reseña creada: ${comentario.substring(0, 30)}... (${calificacion}⭐)`)
    }
}

async function crearCarritoSiNoExiste(userId, productos) {
    const existe = await Carrito.findOne({ userId })
    if (!existe) {
        const carrito = new Carrito({ userId, productos })
        await carrito.save()
        console.log(`Carrito creado con ${productos.length} productos`)
    }
}

async function crearPedidoSiNoExiste(userId, itemsCompra, estado = 'entregado') {
    const subtotal = itemsCompra.reduce((sum, item) => sum + item.subtotal, 0)
    const total = subtotal * 1.1 // +10% impuestos
    
    const cantidadPedidos = await Pedido.countDocuments({ userId })
    if (cantidadPedidos === 0) {
        const pedido = new Pedido({
            userId,
            estado,
            metodoPago: 'tarjeta credito',
            subtotal,
            total,
            itemsCompra
        })
        await pedido.save()
        console.log(`Pedido ${estado} creado (Total: $${total.toFixed(2)})`)
        return pedido
    }
}

async function crearPedidoAdicional(userId, itemsCompra, estado) {
    const subtotal = itemsCompra.reduce((sum, item) => sum + item.subtotal, 0)
    const total = subtotal * 1.1 // +10% impuestos
    
    const pedido = new Pedido({
        userId,
        estado,
        metodoPago: 'efectivo',
        subtotal,
        total,
        itemsCompra
    })
    await pedido.save()
    console.log(`Pedido adicional ${estado} creado (Total: $${total.toFixed(2)})`)
    return pedido
}