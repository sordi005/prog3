import { Carrito } from "../models/carritos.js";
import { Pedido } from "../models/pedidos.js";
import { Producto } from "../models/producto.js";

// Crear orden desde carrito
export const createOrder = async (req, res) => {
    try {
        const userId = req.params.userId || req.user.id;
        const { metodoPago } = req.body;

        console.info("Iniciando creación de orden para usuario:",userId);

        if (!metodoPago || !['tarjeta credito', 'tarjeta debito', 'efectivo', 'transferencia'].includes(metodoPago)) {
            return res.status(400).json({ 
                success: false,
                error: { message: 'Método de pago inválido' }
            });
        }

        const carrito = await Carrito.findOne({ userId }).populate('productos.productoId');
        if (!carrito || carrito.productos.length === 0) {
            return res.status(400).json({ 
                success: false,
                error: { message: 'Carrito vacío o no encontrado' }
            });
        }

        let subtotal = 0;
        const itemsCompra = [];
        const stockUpdates = []; 

        for (const item of carrito.productos) {
            if (!item.productoId) continue;

            const producto = item.productoId;
            
            if (producto.stock < item.cantidad) {
                return res.status(400).json({
                    success: false,
                    error: { 
                        message: `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}, Solicitado: ${item.cantidad}`
                    }
                });
            }

            // subtotal 
            const itemSubtotal = producto.precio * item.cantidad;
            subtotal += itemSubtotal;

           
            itemsCompra.push({
                productoId: producto._id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: item.cantidad,
                subtotal: itemSubtotal
            });

            // Preparar actualización de stock
            stockUpdates.push({
                productoId: producto._id,
                nuevoStock: producto.stock - item.cantidad
            });
        }
        const nuevaOrden = new Pedido({
            userId,
            metodoPago,
            itemsCompra,
            subtotal,
            total: subtotal, 
            estado: 'pendiente'
        });

        await nuevaOrden.save();
        console.info("Orden creada con ID:", nuevaOrden._id);

        // actualizar stock de productos
        for (const update of stockUpdates) {
            await Producto.findByIdAndUpdate(
                update.productoId,
                { stock: update.nuevoStock }
            );
        }
        console.info("Stock actualizado para todos los productos");

        carrito.productos = [];
        await carrito.save();
        console.info("Carrito vaciado");

        res.status(201).json({
            success: true,
            data: {
                ordenId: nuevaOrden._id,
                fecha: nuevaOrden.fecha,
                itemsCompra: nuevaOrden.itemsCompra,                
                total: nuevaOrden.total,
                estado: nuevaOrden.estado,
            },
            message: 'Orden creada exitosamente'
        });

    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).json({ 
            success: false,
            error: { message: error.message }
        });
    }
};

// Obtener todas las órdenes (admin)
export const getOrders = async (req, res) => {
    try {
        console.info("Obteniendo todas las órdenes");
        
        const ordenes = await Pedido.find()
            .populate('userId', 'nombre email')
            .populate('itemsCompra.productoId', 'nombre precio')
            .sort({ fecha: -1 });

        const ordenesFormateadas = ordenes.map(orden => ({
            ordenId: orden._id,
            fecha: orden.fecha,
            estado: orden.estado,
            metodoPago: orden.metodoPago,
            subtotal: orden.subtotal,
            total: orden.total,
            usuario: {
                id: orden.userId._id,
                nombre: orden.userId.nombre,
                email: orden.userId.email
            },
            cantidadProductos: orden.itemsCompra.length,
            productos: orden.itemsCompra.map(item => ({
                nombre: item.nombre,
                cantidad: item.cantidad,
                subtotal: item.subtotal
            }))
        }));

        res.status(200).json({
            success: true,
            data: {
                cantidad: ordenes.length,
                ordenes: ordenesFormateadas
            }
        });
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

// Obtener orden por ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params || req.user.id;
        console.info("Obteniendo orden:", id);

        const orden = await Pedido.findById(id)
            .populate('userId', 'nombre email')
            .populate('itemsCompra.productoId');

        if (!orden) {
            return res.status(404).json({
                success: false,
                error: { message: 'Orden no encontrada' }
            });
        }
        res.status(200).json({
            success: true,
            data: {
                ordenId: orden._id,
                fecha: orden.fecha,
                estado: orden.estado,
                metodoPago: orden.metodoPago,
                subtotal: orden.subtotal,
                total: orden.total,
                usuario: {
                    id: orden.userId._id,
                    nombre: orden.userId.nombre,
                    email: orden.userId.email
                },
                productos: orden.itemsCompra.map(item => ({
                    productoId: item.productoId._id,
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.cantidad,
                    subtotal: item.subtotal
                }))
            }
        });
    } catch (error) {
        console.error("Error al obtener orden:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

// Obtener órdenes de un usuario
export const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId || req.user.id;
        console.info("Obteniendo órdenes del usuario:", userId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                error: { message: 'Usuario no encontrado' }
            });
        }


        const ordenes = await Pedido.find({ userId })
            .populate('itemsCompra.productoId', 'nombre precio')
            .sort({ fecha: -1 });

        const ordenesResponse = ordenes.map(orden => ({
            ordenId: orden._id,
            fecha: orden.fecha,
            estado: orden.estado,
            metodoPago: orden.metodoPago,
            subtotal: orden.subtotal,
            total: orden.total,
            cantidadProductos: orden.itemsCompra.length,
            productos: orden.itemsCompra.map(item => ({
                nombre: item.nombre,
                cantidad: item.cantidad,
                subtotal: item.subtotal
            }))
        }));

        res.status(200).json({
            success: true,
            data: {
                cantidad: ordenes.length,
                ordenes: ordenesResponse
            }
        });
    } catch (error) {
        console.error("Error al obtener órdenes del usuario:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

// Actualizar estado de orden 
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        console.info("Actualizando estado de orden:", id);

        const estadosValidos = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'];
        if (!estado || !estadosValidos.includes(estado)) {
            return res.status(400).json({
                success: false,
                error: { message: 'Estado inválido' }
            });
        }

        const orden = await Pedido.findById(id);
        if (!orden) {
            return res.status(404).json({
                success: false,
                error: { message: 'Orden no encontrada' }
            });
        }

        // devolver stoc ksi se cancela
        if (estado === 'cancelado' && orden.estado !== 'cancelado') {
            for (const item of orden.itemsCompra) {
                await Producto.findByIdAndUpdate(
                    item.productoId,
                    { $inc: { stock: item.cantidad } }
                );
            }
            console.info("Stock restaurado por cancelación");
        }

        orden.estado = estado;
        await orden.save();

        res.status(200).json({
            success: true,
            data: {
                ordenId: orden._id,
                nuevoEstado: estado
            },
            message: 'Estado actualizado correctamente'
        });
    } catch (error) {
        console.error("Error al actualizar estado:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

// Obtener estadísticas de órdenes 
export const getOrdersStats = async (req, res) => {
    try {
        console.info("Obteniendo estadísticas de órdenes");

        const estadisticas = await Pedido.aggregate([
            {
                $group: {
                    _id: '$estado',
                    cantidad: { $sum: 1 },
                    totales: { $sum: '$total' }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const totales = await Pedido.aggregate([
            {
                $group: {
                    _id: null,
                    ordenesTotal: { $sum: 1 },
                    totalesGenerales: { $sum: '$total' },
                    promedioGeneral: { $avg: '$total' }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                porEstado: estadisticas,
                totales: totales[0] || { ordenesTotal: 0, ventasTotal: 0, promedioOrden: 0 }
            }
        });
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};


export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        console.info("Actualizando orden:", id);

        return res.status(400).json({
            success: false,
            error: { message: 'Actualización de órdenes no permitida. Use updateOrderStatus para cambiar el estado.' }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        console.info("Intento de eliminar orden:", id);

        return res.status(400).json({
            success: false,
            error: { message: 'Eliminación de órdenes no permitida. Use cancelación en su lugar.' }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};