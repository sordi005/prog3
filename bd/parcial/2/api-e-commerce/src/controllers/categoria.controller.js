import { Categoria } from "../models/categoria.js"
import { Producto } from "../models/producto.js"

export const createCategoria = async (req, res) => {
    try {
        console.info("Iniciando creación de categoría")
        const { nombre, descripcion } = req.body
        
        if (!nombre || !descripcion) {
            console.warn("Parámetros incompletos:", req.body)
            return res.status(400).json({ message: 'Faltan parámetros requeridos' })
        }

        const categoriaExistente = await Categoria.findOne({ nombre })
        if (categoriaExistente) {
            console.warn("Categoría ya existe con nombre:", nombre)
            return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' })
        }

        const newCategoria = new Categoria({
            nombre,
            descripcion
        })

        await newCategoria.save()
        console.info("Categoría creada con éxito:", newCategoria._id)

        const categoriaResponse = {
            id: newCategoria._id,
            nombre: newCategoria.nombre,
            descripcion: newCategoria.descripcion
        }

        return res.status(201).json({ categoria: categoriaResponse })
        
    } catch (error) {
        console.error("Error al crear categoría:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}

export const getAllCategorias = async (req, res) => {
    try {
        console.info("Obteniendo todas las categorías")
        
        const categorias = await Categoria.find()
            .select('_id nombre descripcion')
            .lean()

        const categoriasResponse = categorias.map(cat => ({
            id: cat._id,
            nombre: cat.nombre,
            descripcion: cat.descripcion
        }))

        console.info(`Se encontraron ${categoriasResponse.length} categorías`)
        
        return res.status(200).json({ 
            count: categoriasResponse.length,
            categorias: categoriasResponse 
        })

    } catch (error) {
        console.error("Error al obtener categorías:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}

export const getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params
        console.info("Obteniendo categoría por ID:", id)

        const categoria = await Categoria.findById(id).select('_id nombre descripcion')
        .lean()

        if (!categoria) {
            console.warn("Categoría no encontrada con ID:", id)
            return res.status(404).json({ message: 'Categoría no encontrada' })
        }

        console.info("Categoría encontrada:", categoria._id)


        const categoriaResponse = {            
            id: categoria._id,
            nombre: categoria.nombre,
            descripcion: categoria.descripcion
        }

        return res.status(200).json({ categoria: categoriaResponse })

    } catch (error) {
        console.error("Error al obtener categoría:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}

export const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, descripcion } = req.body
        
        console.info("Actualizando categoría:", id)

        const updates = {}
        if (nombre !== undefined) {
            const categoriaExistente = await Categoria.findOne({ 
                nombre, 
                _id: { $ne: id } 
            })
            if (categoriaExistente) {
                console.warn("Otra categoría ya existe con nombre:", nombre)
                return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' })
            }
            updates.nombre = nombre
        }
        if (descripcion !== undefined) updates.descripcion = descripcion

        // Actualizar
        const categoria = await Categoria.findByIdAndUpdate(
            id,
            updates,
            { 
                new: true,
                runValidators: true
            } 
        ).select('_id nombre descripcion')


        if (!categoria) {
            console.warn("Categoría no encontrada con ID:", id)
            return res.status(404).json({ message: 'Categoría no encontrada' })
        }

        console.info("Categoría actualizada con éxito:", id)

        const categoriaResponse = {
            id: categoria._id,
            nombre: categoria.nombre,
            descripcion: categoria.descripcion
        }

        return res.status(200).json({ categoria: categoriaResponse })

    } catch (error) {
        console.error("Error al actualizar categoría:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}

export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params
        console.info("Eliminando categoría:", id)

        const categoria = await Categoria.findByIdAndDelete(id)

        if (!categoria) {
            console.warn("Categoría no encontrada con ID:", id)
            return res.status(404).json({ message: 'Categoría no encontrada' })
        }

        console.info("Categoría eliminada con éxito:", id)
        return res.status(200).json({ 
            message: 'Categoría eliminada exitosamente',
            id: categoria._id 
        })

    } catch (error) {
        console.error("Error al eliminar categoría:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}

export const getCategoriawithProductos = async (req, res) => {
    try {
        console.info("Contando productos en categoría")

        const categorias = await Categoria.aggregate([
            {
                $lookup: {
                    from: 'productos',
                    localField: '_id',
                    foreignField: 'categoriaId',
                    as: 'productos'
                }
            },
            {
                $project: {
                    nombre: 1,
                    descripcion: 1,
                    totalProductos: {
                        $size: "$productos"
                    }
                }
            },
            {
                $sort: { totalProductos: 1 }
            }
        ])
        console.log(`se encontraron ${categorias.length} categorías con conteo de productos`);
        return res.status(200).json({categorias: categorias })
    } catch (error) {
        console.error("Error al contar productos en categoría:", error)
        return res.status(500).json({ message: `Error: ${error.message}` })
    }
}