import { Libro } from "../models/Libro.js";

export const createLibro = async (titulo, paginas, categorias, author_id) => {
    try{
        if (!titulo || !paginas || !categorias) {
            throw new Error("Datos no válidos");
        }
        const libro = new Libro({ titulo, paginas, categorias, author_id });
        const nuevoLibro = await libro.save();
        return nuevoLibro;
    }catch (error) {
        console.error("Error al crear el libro:", error);
        throw error;
    }
}

export const getAllLibros = async () => {
    try{
        const libros = await Libro.find();
        return libros;
    }catch (error) {
        console.error("Error al obtener los libros:", error);
        throw error;
    }
}

export const getLibroById = async (id) => {
    try{
        if (!id){
            throw new Error("Datos no válidos");
        }
        const libro = await Libro.findById(id);
        return libro;
    }catch (error) {
        console.error("Error al obtener el libro por ID:", error);
        throw error;
    }
}

export const updateLibro = async (id, titulo, paginas, categorias, author_id) => {
    try{
        if (!id){
            throw new Error("ID del libro es requerido");
        }
        if (!titulo || !paginas || !categorias) {
            throw new Error("Datos no válidos");
        }
        const libro = await Libro.findByIdAndUpdate(id, { titulo, paginas, categorias, author_id }, { new: true });
        return libro;
    }catch (error) {
        console.error("Error al actualizar el libro por ID:", error);
        throw error;
    }
}

export const deleteLibro = async (id) => {
    try{
        if (!id){
            throw new Error("Datos no válidos");
        }
        const libro = await Libro.findByIdAndDelete(id);
        return libro;
    }catch (error) {
        console.error("Error al eliminar el libro por ID:", error);
        throw error;
    }
}

export const contarLibros = async () => {
    try{
        const cantidad = await Libro.countDocuments();
        return cantidad;
    }catch (error) {
        console.error("Error al contar los libros:", error);
        throw error;
    }
}

export const listarConNombreAutor = async () => {
    try{
        const libros = await Libro.aggregate([
            {
              $lookup: {
                from: 'autores',           
                localField: 'author_id',  
                foreignField: '_id',      
                as: 'autor'               
              }
            },
            {
              $unwind: '$autor'           
            },
            {
              $project: {                
                titulo: 1,
                paginas: 1,
                categorias: 1,
                'autor.nombre': 1
              }
            }
          ])

        return libros;
    }catch (error) {
        console.error("Error al listar los libros con nombre del autor:", error);
        throw error;
    }
}

export const promedioDePaginasPorAutor = async () => {
    try{
        const promedio = await Libro.aggregate([
            {
              $lookup: {
                from: "autores",
                localField: "author_id",
                foreignField: "_id",
                as: "autor"
              }
            },
            {
              $unwind: "$autor"
            },
            {
              $group: {
                _id:"$autor._id",
                autorNombre: {$first: "$autor.nombre"},
                promedio: { $avg: "$paginas" }
              }
            },
            {
              $project: {
                _id: 0,
                nombreAutor: "$autorNombre",
                promedio: 1
              }
            }
          ])
        return promedio;
    }catch (error) {
        console.error("Error al calcular el promedio de paginas por autor:", error);
        throw error;
    }
}

export const existePorTitulo = async (titulo) => {
    try{
        const existe = await Libro.exists({ titulo: titulo });
        if(!existe){
            return false;
        }
        return true;
    }catch (error) {
        console.error("Error al verificar si el libro existe por titulo:", error);
        throw error;
    }
}

export const listarAutoresConCantidadDeLibros = async () => {
    try{
        const autores = await Libro.aggregate([
            {
                $lookup: {
                    from: "autores",
                    localField: "author_id",
                    foreignField: "_id",
                    as: "autor"
                }
            },
            {
                $unwind: "$autor"
            },
            {
                $group: {
                    _id: "$autor._id",
                    nombre: "$autor.nombre",
                    cantidad: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    nombre: 1,
                    cantidad: 1
                }
            }
            
        ])
        return autores;
    }catch (error) {
        console.error("Error al listar los autores con cantidad de libros:", error);
        throw error;
    }
}