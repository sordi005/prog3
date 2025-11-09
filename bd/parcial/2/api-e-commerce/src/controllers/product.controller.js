import { Categoria } from "../models/categoria.js";
import { Producto } from "../models/producto.js";
import { Resena } from "../models/resena.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    try {
        console.info("Iniciando creación de producto:");
        const { nombre, descripcion, categoriaId, precio, stock } = req.body;
        if (!nombre || !descripcion || !categoriaId || !precio || !stock) {
            console.warn("Parámetros incompletos para creación de producto:", req.body);
            return res.status(400).json({ message: 'Faltan parámetros requeridos' });
        }
        
        const categoriaEncontrada = await Categoria.findById(categoriaId);
        
        if (!categoriaEncontrada) {
            console.error("Categoría no encontrada con ID:", categoriaId);
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        const newProduct = new Producto({
            nombre,
            descripcion,
            categoriaId,
            precio,
            stock
        });

        await newProduct.save();
        console.info("Producto creado con éxito:", newProduct);

        const productResponse = {
            id: newProduct._id,
            nombre: newProduct.nombre,
            descripcion: newProduct.descripcion,
            categoriaId: newProduct.categoriaId,
            precio: newProduct.precio,
            stock: newProduct.stock
        };


        return res.status(201).json({ product: productResponse });
    } catch (error) {
        console.error("Error al crear producto:", error);
        return res.status(500).json({ message: `Error: ${error.message}` });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        console.info("Obteniendo todos los productos");
        const productos = await Producto.aggregate([
            {
                $lookup: {
                    from: "categorias",
                    localField: "categoriaId",
                    foreignField: "_id",
                    as: "categoria"
                },
           
            },
            {
                $unwind: {
                   path: "$categoria",
                   preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    nombre: 1,
                    descripcion: 1,
                    precio: 1,
                    stock: 1,
                    categoria: {
                        id: "$categoria._id",
                        nombre: "$categoria.nombre",
                        descripcion: "$categoria.descripcion"
                    }
                },
            },
            {
                $sort: { nombre: 1 }
            }
        ]);

        if (productos.length === 0) {
            console.warn("No se encontraron productos en la base de datos");
            return res.status(404).json({ message: 'No se encontraron productos' });
        }

        console.info(`Se encontraron ${productos.length} productos`);
        return res.status(200).json({
            cantidad: productos.length,
            productos: productos
        });

    }catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({ message: `Error: ${error.message}` });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        console.info("Obteniendo producto por ID:", id)

        const producto = await Producto.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "categorias",
                    localField: "categoriaId",
                    foreignField: "_id",
                    as: "categoria"
                }
            },
            {
                $unwind: {
                    path: "$categoria",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    nombre: 1,
                    descripcion: 1,
                    precio: 1,
                    stock: 1,
                    categoria: {
                        id: "$categoria._id",
                        nombre: "$categoria.nombre",
                        descripcion: "$categoria.descripcion"
                    }
                }
            }
        ]);

        const productoEncontrado = producto[0];

        console.log("Producto encontrado:", productoEncontrado)

        if (!productoEncontrado) {
            console.warn("Producto no encontrado con ID:", id)
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        console.info("Producto encontrado:", productoEncontrado.id)
        return res.status(200).json({ product: productoEncontrado })

    } catch (error) {
        console.error("Error al obtener producto:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, descripcion, categoriaId, precio, stock } = req.body
        
        console.info("Actualizando producto:", id)

        const updates = {}
        if (nombre !== undefined) updates.nombre = nombre
        if (descripcion !== undefined) updates.descripcion = descripcion
        if (precio !== undefined) updates.precio = precio
        if (stock !== undefined) updates.stock = stock
        
        if (categoriaId !== undefined) {
            const categoriaExiste = await Categoria.findById(categoriaId)
            if (!categoriaExiste) {
                return res.status(404).json({ message: 'Categoría no encontrada' })
            }
            updates.categoriaId = categoriaId
        }

        const producto = await Producto.findByIdAndUpdate(
            id,
            updates,
            { 
                new: true,
                runValidators: true
            }
        )

        if (!producto) {
            console.warn("Producto no encontrado con ID:", id)
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        console.info("Producto actualizado con éxito:", id)

        const productoResponse = {
            id: producto._id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            categoriaId: producto.categoriaId,
            precio: producto.precio,
            stock: producto.stock
        }

        return res.status(200).json({ product: productoResponse })

    } catch (error) {
        console.error("Error al actualizar producto:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}

export const updateStock = async (req, res) => {
    try {
        const { id } = req.params
        const { stock } = req.body
        console.info("Actualizando stock del producto:", id)

        if (stock === undefined || stock < 0) {
            console.warn("Parámetro de stock faltante o inválido en la solicitud")
            return res.status(400).json({ message: 'Falta el parámetro de stock o es inválido' })
        }

        const producto = await Producto.findByIdAndUpdate(
            id,
            { stock },
            { new: true, runValidators: true }
        )

        if (!producto) {
            console.warn("Producto no encontrado con ID:", id)
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        console.info("Stock del producto actualizado con éxito:", id)

        return res.status(200).json({ product: producto })

    } catch (error) {
        console.error("Error al actualizar stock del producto:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        console.info("Eliminando producto:", id)

        const producto = await Producto.findByIdAndDelete(id)

        if (!producto) {
            console.warn("Producto no encontrado con ID:", id)
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        console.info("Producto eliminado con éxito:", id)
        return res.status(200).json({ 
            message: 'Producto eliminado exitosamente',
            id: producto._id 
        })

    } catch (error) {
        console.error("Error al eliminar producto:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}

//FILTRADO 

export const filterProductByRangePrice = async (req, res) => {
    try {

        const { min, max } = req.query;
        console.log("Parámetros de precio:", min, max);
        if (!min || !max || isNaN(min) || isNaN(max)) {
            return res.status(400).json({ message: 'Faltan parámetros de precio' });
        }
        console.info(`Filtrando productos por rango de precio: ${min} - ${max}`);

        const productos = await Producto.find({
            precio: { $gte: min, $lte: max }
        });

        const productResponse = productos.map(producto => ({
            id: producto._id,
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            categoria: producto.categoria
        }));

        return res.status(200).json({ cantidad: productos.length, productos: productResponse });
    } catch (error) {
        console.error("Error al filtrar productos:", error);
        return res.status(500).json({ message: `Error: ${error.message}` });
    }
}

export const getTopPructsByResenas = async (req, res) => {
    try {
        console.info("Obteniendo productos con más reseñas");
        const { limit = 10 } = req.query;

        const productosMasResenados = await Resena.aggregate([
            {
                $group: {
                    _id: "$productoId",
                    cantidadResenas: { $sum: 1 },
                    promedioCalificacion: { $avg: "$calificacion" }
                }
            },
            {
                $sort: { 
                    cantidadResenas: -1,
                    promedioCalificacion: -1
                }
            },
            {
                $limit: parseInt(limit)
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
                $lookup: {
                    from: 'categorias',
                    localField: 'producto.categoriaId',
                    foreignField: '_id',
                    as: 'categoria'
                }
            },
            {
                $unwind: {
                    path: "$categoria",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$producto._id",
                    nombre: "$producto.nombre",
                    descripcion: "$producto.descripcion",
                    precio: "$producto.precio",
                    stock: "$producto.stock",
                    categoria: {
                        id: "$categoria._id",
                        nombre: "$categoria.nombre"
                    },
                    cantidadResenas: 1,
                    promedioCalificacion: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                cantidad: productosMasResenados.length,
                productos: productosMasResenados
            }
        });
    } catch (error) {
        console.error("Error al obtener productos más reseñados:", error);
        res.status(500).json({ 
            success: false,
            error: { message: error.message } 
        });
    }
}

