import { Carrito } from "../models/carritos.js"
import { Producto } from "../models/producto.js"

const calcularSubtotal = (precio, cantidad) => {
    return precio * cantidad;
}

export const createCarrito = async (req, res) => {
    try {
        console.info("Creando carrito para usuario: ", req.user.id);
        const usuarioId = req.user.id;
     
        const carritoExistente = await Carrito.findOne({ 
            userId: { $eq: usuarioId } 
        });
        
        if (carritoExistente) {
            console.error("El usuario ya tiene un carrito activo");
            return res.status(400).json({ 
                success: false, 
                error: { message: 'El usuario ya tiene un carrito activo' } 
            });
        }       
        
        const nuevoCarrito = new Carrito({
            userId: usuarioId,
            productos: []
        });

        console.info("Carrito creado exitosamente");
        await nuevoCarrito.save();

        res.status(201).json({ 
            success: true,
            data: nuevoCarrito,
            message: 'Carrito creado exitosamente'
        });

    } catch (error) {
        console.error("Error al crear carrito:", error);
        res.status(500).json({ 
            success: false,
            error: { message: error.message }
        });
    }
}

export const getCarritoByUserId = async (req, res) => {
    try {
        
       const usuarioId = req.params.usuarioId || req.user.id;
       console.info("Buscando carrito para usuario: ", usuarioId);

        const carrito = await Carrito.findOne({ 
            userId: { $eq: usuarioId } 
        }).populate('productos.productoId', 'nombre'); // Solo traer el nombre
        
        if (!carrito) {
            console.error("Carrito no encontrado para usuario: ", usuarioId);
            return res.status(404).json({ 
                success: false,
                error: { message: 'Carrito no encontrado' }
            });
        }

        console.info("Carrito encontrado para usuario: ", usuarioId);
        const productosSimple = carrito.productos
            .filter(item => item.productoId)
            .map(item => ({
                nombre: item.productoId.nombre,
                cantidad: item.cantidad
            }));

        console.info("Carrito encontrado para usuario: ", usuarioId);
        res.status(200).json({
            success: true,
            data: {
                _id: carrito._id,
                userId: carrito.userId,
                productos: productosSimple
            }
        });

    } catch (error) {
        console.error("Error al obtener carrito:", error);
        res.status(500).json({ 
            success: false,
            error: { message: error.message }
        });
    }
}

export const getCarritoTotal = async (req, res) => {
    
    try {
        console.info("Calculando total del carrito para usuario: ", req.user.id);
        const usuarioId = req.params.id || req.user.id;
        const carrito = await Carrito.findOne({ userId: usuarioId })
            .populate('productos.productoId')
            .populate('userId', 'nombre email'); 

        if (!carrito) {
            console.error("Carrito no encontrado para usuario: ", usuarioId);
            return res.status(404).json({
                success: false,
                error: { message: 'Carrito no encontrado' }
            });
        }

        let total = 0;
        const productosConSubtotal = carrito.productos
            .filter(item => item.productoId) 
            .map(item => {
                const subtotal = item.productoId.precio * item.cantidad;
                total += subtotal;
                return {
                    productoId: item.productoId._id,
                    nombre: item.productoId.nombre,
                    precio: item.productoId.precio,
                    cantidad: item.cantidad,
                    subtotal: subtotal
                };
            });

        console.info("Total calculado para usuario: ", usuarioId);
        res.status(200).json({
            success: true,
            data: {
                carritoId: carrito._id,
                usuarioId: carrito.userId._id,
                nombreUsuario: carrito.userId.nombre,
                emailUsuario: carrito.userId.email,
                productos: productosConSubtotal,
                cantidadProductos: productosConSubtotal.length,
                subtotal: total,
                total: total
            }
        });
        
    } catch (error) {
        console.error("Error al calcular total:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
}

export const addProductToCarrito = async (req, res) => {

    try {
        console.info("Agregando producto al carrito para usuario: ", req.user.id);
        const usuarioId = req.params.id || req.user.id;
        if (!usuarioId) {
            return res.status(400).json({ 
                success: false,
                error: { message: 'Usuario no encontrado' }
            });
        }
        
        const { productoId, cantidad } = req.body;
        
        if (!productoId || !cantidad || cantidad <= 0) {
            console.error("Datos inválidos para agregar producto al carrito");
            return res.status(400).json({ 
                success: false,
                error: { message: 'Datos inválidos' }
            });
        }

        const producto = await Producto.findById(productoId);
        if (!producto) {
            console.error("Producto no encontrado: ", productoId);
            return res.status(404).json({ 
                success: false,
                error: { message: 'Producto no encontrado' }
            });
        }

        if (cantidad > producto.stock) {
            console.error("Stock insuficiente para el producto: ", productoId);
            return res.status(400).json({ 
                success: false,
                error: { message: 'Stock insuficiente' }
            });
        }
        let carrito = await Carrito.findOne({ userId: usuarioId });
        
        if (!carrito) {
            console.error("Carrito no encontrado para usuario: ", usuarioId);
            return res.status(404).json({ 
                success: false,
                error: { message: 'Carrito no encontrado' }
            });
        }

        const indiceProducto = carrito.productos.findIndex(
            p => p.productoId.toString() === productoId.toString()
        );

        console.info("Indice del producto: ", indiceProducto);
        if (indiceProducto !== -1) {
            carrito.productos[indiceProducto].cantidad += cantidad;
        } else {
            // Si no existe, agregar
            carrito.productos.push({ 
                productoId, 
                cantidad 
            });
        }

        await carrito.save();

        res.status(200).json({ 
            success: true,
            message: 'Producto agregado al carrito',
            data: carrito
        });

    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ 
            success: false,
            error: { message: error.message }
        });
    }
}

export const updateCantidadProducto = async (req, res) => {
    try {

        const usuarioId = req.params.id || req.user.id;
        console.info("Actualizando cantidad de producto para usuario: ", usuarioId);
        const productoId = req.params.productoId;
        const { cantidad } = req.body;
        
        if (cantidad <= 0) {
            console.error("La cantidad debe ser mayor a 0");
            return res.status(400).json({
                success: false,
                error: { message: 'La cantidad debe ser mayor a 0' }
            });
        }

        const carrito = await Carrito.findOne({ userId: usuarioId });
        if (!carrito) {
            console.error("Carrito no encontrado para usuario: ", usuarioId);
            return res.status(404).json({
                success: false,
                error: { message: 'Carrito no encontrado' }
            });
        }
        
        const itemCarrito = carrito.productos.find(p => p.productoId.toString() === productoId.toString());
        if (!itemCarrito) {
            console.error("Producto no encontrado en el carrito: ", productoId);
            return res.status(404).json({
                success: false,
                error: { message: 'Producto no encontrado en el carrito' }
            });
        }

        // Buscar el producto real para verificar stock
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({
                success: false,
                error: { message: 'Producto no encontrado' }
            });
        }

        if(cantidad > producto.stock) {
            console.error("Stock insuficiente para el producto: ", productoId);
            return res.status(400).json({
                success: false,
                error: { message: 'Stock insuficiente' }
            });
        }
        // Actualizar cantidad del producto en el carrito
        itemCarrito.cantidad = cantidad;
        
        console.info("Cantidad actualizada correctamente para producto: ", productoId);
        
        await carrito.save();
        
        console.info("Carrito actualizado correctamente para usuario: ", usuarioId);
        
        return res.status(200).json({
            success: true,
            message: 'Cantidad actualizada correctamente',
            data: carrito
        });

    } catch (error) {
        console.error("Error al actualizar cantidad:", error);
        return res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
}

export const removeProductFromCarrito = async (req, res) => {
    try {
        const usuarioId = req.params.id || req.user.id;
        const productoId = req.params.productoId;
        
        console.info("Eliminando producto del carrito para usuario: ", usuarioId);
        
        const resultado = await Carrito.updateOne(
            { userId: usuarioId },
            { 
                $pull: { 
                    productos: { productoId: productoId } 
                } 
            }
        );

        if (!resultado) {
            return res.status(404).json({
                success: false,
                error: { message: 'Carrito o producto no encontrado' }
            });
        }

        console.info("Producto eliminado del carrito para usuario: ", usuarioId);
        res.status(200).json({ 
            success: true,
            message: 'Producto eliminado del carrito'
        });

    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ 
            success: false,
            error: { message: error.message }
        });
    }
}

export const clearCarrito = async (req, res) => {
    try {
        const usuarioId = req.params.id || req.user.id;
        console.info("Vaciando carrito para usuario: ", usuarioId);
        
        const resultado = await Carrito.updateOne(
            { userId: usuarioId },
            { $set: { productos: [] } }
        );

        if (!resultado) {
            return res.status(404).json({
                success: false,
                error: { message: 'Carrito no encontrado' }
            });
        }

        console.info("Carrito vaciado correctamente para usuario: ", usuarioId);
        return res.status(200).json({
            success: true,
            message: 'Carrito vaciado correctamente'
        });

    } catch (error) {
        console.error("Error al vaciar carrito:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
}

export const deleteCarrito = async (req, res) => {
    try {
        const usuarioId = req.params.id || req.user.id;
        console.info("Eliminando carrito para usuario: ", usuarioId);
       
        const resultado = await Carrito.deleteOne({ userId: usuarioId });

        if (!resultado) {
            console.error("Carrito no encontrado para usuario: ", usuarioId);
            return res.status(404).json({
                success: false,
                error: { message: 'Carrito no encontrado' }
            });
        }
        console.info("Carrito eliminado correctamente para usuario: ", usuarioId);
        res.status(200).json({
            success: true,
            message: 'Carrito eliminado correctamente'
        });

    } catch (error) {
        console.error("Error al eliminar carrito:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
}
