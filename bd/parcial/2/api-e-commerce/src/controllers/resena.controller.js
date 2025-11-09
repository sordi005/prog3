import { Resena } from '../models/resena.js'
import { Producto } from '../models/producto.js'
import { Pedido } from '../models/pedidos.js'
import { User } from '../models/user.js'
import mongoose from 'mongoose'


export const getAllResenas = async (req, res) => {
    try {
        console.info("Obteniendo todas las reseñas");
        
        const resenas = await Resena.find()
            .populate('usuarioId', 'nombre email')
            .populate('productoId', 'nombre precio')
            .sort({ fecha: -1 });
        
        const resenasResponse = resenas.map(resena => ({
            resenaId: resena._id,
            fecha: resena.fecha,
            comentario: resena.comentario,
            calificacion: resena.calificacion,
            producto: {
                id: resena.productoId._id,
                nombre: resena.productoId.nombre,
                precio: resena.productoId.precio
            },
            usuario: resena.usuarioId
        }));
        
        res.status(200).json({
            success: true,
            data: {
                cantidad: resenasResponse.length,
                resenas: resenasResponse
            }
        });
    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

    // Obtener reseñas de un producto específico
export const getResenasByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        console.info("Obteniendo reseñas del producto:", productId);
        
        const resenas = await Resena.find({ productoId: productId })
            .populate('usuarioId', 'nombre email')
            .sort({ fecha: -1 });
        
        const producto = await Producto.findById(productId).select('nombre precio');
        
        if (!producto) {
            return res.status(404).json({
                success: false,
                error: { message: 'Producto no encontrado' }
            });
        }
        
        const resenasResponse = resenas.map(resena => ({
            resenaId: resena._id,
            fecha: resena.fecha,
            comentario: resena.comentario,
            calificacion: resena.calificacion,
            usuario: resena.usuarioId
        }));
        
        res.status(200).json({
            success: true,
            data: {
                producto: {
                    id: producto._id,
                    nombre: producto.nombre,
                    precio: producto.precio
                },
                cantidad: resenasResponse.length,
                resenas: resenasResponse
            }
        });
    } catch (error) {
        console.error("Error al obtener reseñas del producto:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

// Obtener promedio de calificaciones 
export const getTopResenasPromedio = async (req, res) => {
    try {
        console.info("Obteniendo promedio de calificaciones por producto");
        
        const promedios = await Resena.aggregate([
            {
                $group: {
                    _id: "$productoId",
                    cantidadResenas: { $sum: 1 },
                    promedioCalificacion: { $avg: "$calificacion" }
                }
            },
            {
                $sort: { 
                    promedioCalificacion: -1,
                    cantidadResenas: -1
                }
            },
            {
                $lookup: {
                    from: 'productos',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'producto'
                }
            },
            {
                $unwind: "$producto"
            },
            {
                $project: {
                    _id: 0,
                    productoId: "$_id",
                    nombre: "$producto.nombre",
                    precio: "$producto.precio",
                    cantidadResenas: 1,
                    promedioCalificacion: 1
                }
            }
        ]);
        
        res.status(200).json({
            success: true,
            data: {
                cantidad: promedios.length,
                productos: promedios
            }
        });
    } catch (error) {
        console.error("Error al obtener top de reseñas:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

export const createResena = async (req, res) => {
    try {
        const { productoId, comentario, calificacion } = req.body;
        const userId = req.params.userId || req.user.id;
        
        console.info("Creando reseña para producto:", productoId);
        
        if (!productoId || !comentario || !calificacion) {
            return res.status(400).json({
                success: false,
                error: { message: 'Faltan datos requeridos' }
            });
        }
        
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: { message: 'Usuario no autenticado' }
            });
        }
        
        if (calificacion < 1 || calificacion > 5) {
            return res.status(400).json({
                success: false,
                error: { message: 'La calificación debe estar entre 1 y 5' }
            });
        }
        
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({
                success: false,
                error: { message: 'Producto no encontrado' }
            });
        }
        
        // Verificar que el usuario existe
        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                error: { message: 'Usuario no encontrado' }
            });
        }
        
        const ordenCompra = await Pedido.findOne({
            userId: userId,
            'itemsCompra.productoId': productoId,
            estado: { $in: ['pagado', 'enviado', 'entregado'] }
        });
        
        if (!ordenCompra) {
            return res.status(403).json({
                success: false,
                error: { message: 'Debes comprar el producto antes de poder reseñarlo' }
            });
        }
        
        const resenaExistente = await Resena.findOne({
            usuarioId: userId,
            productoId: productoId
        });
        
        if (resenaExistente) {
            return res.status(400).json({
                success: false,
                error: { message: 'Ya has reseñado este producto' }
            });
        }
        
        // Crear la reseña
        const nuevaResena = new Resena({
            usuarioId: userId,
            productoId: productoId,
            comentario,
            calificacion
        });
        
        await nuevaResena.save();
        
        // Poblar los datos del usuario
        await nuevaResena.populate('usuarioId', 'nombre email');
        
        res.status(201).json({
            success: true,
            data: {
                resenaId: nuevaResena._id,
                fecha: nuevaResena.fecha,
                comentario: nuevaResena.comentario,
                calificacion: nuevaResena.calificacion,
                producto: {
                    id: producto._id,
                    nombre: producto.nombre
                },
                usuario: {
                    id: nuevaResena.usuarioId._id,
                    nombre: nuevaResena.usuarioId.nombre,
                    email: nuevaResena.usuarioId.email
                }
            },
            message: 'Reseña creada exitosamente'
        });
    } catch (error) {
        console.error("Error al crear reseña:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

// Actualizar reseña (solo el autor)
export const updateResena = async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario, calificacion } = req.body;
        const userId = req.user.id;
        
        console.info("Actualizando reseña:", id);
        
        if (!comentario && !calificacion) {
            return res.status(400).json({
                success: false,
                error: { message: 'Debe proporcionar al menos un campo para actualizar' }
            });
        }
        
        if (calificacion && (calificacion < 1 || calificacion > 5)) {
            return res.status(400).json({
                success: false,
                error: { message: 'La calificación debe estar entre 1 y 5' }
            });
        }
        
        const resena = await Resena.findById(id);
        
        if (!resena) {
            return res.status(404).json({
                success: false,
                error: { message: 'Reseña no encontrada' }
            });
        }
        
        // Verificar que el usuario es el autor
        if (resena.usuarioId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                error: { message: 'No tienes permiso para editar esta reseña' }
            });
        }
        
        // Actualizar campos
        if (comentario) resena.comentario = comentario;
        if (calificacion) resena.calificacion = calificacion;
        
        await resena.save();
        
        res.status(200).json({
            success: true,
            data: {
                resenaId: resena._id,
                comentario: resena.comentario,
                calificacion: resena.calificacion,
                fecha: resena.fecha
            },
            message: 'Reseña actualizada exitosamente'
        });
    } catch (error) {
        console.error("Error al actualizar reseña:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};

// Eliminar reseña (solo el autor o admin)
export const deleteResena = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRol = req.user.rol;
        
        console.info("Eliminando reseña:", id);
        
        const resena = await Resena.findById(id);
        
        if (!resena) {
            return res.status(404).json({
                success: false,
                error: { message: 'Reseña no encontrada' }
            });
        }
        
        // Verificar permisos
        if (userRol !== 'admin' && resena.usuarioId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                error: { message: 'No tienes permiso para eliminar esta reseña' }
            });
        }
        
        await Resena.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: 'Reseña eliminada exitosamente'
        });
    } catch (error) {
        console.error("Error al eliminar reseña:", error);
        res.status(500).json({
            success: false,
            error: { message: error.message }
        });
    }
};
