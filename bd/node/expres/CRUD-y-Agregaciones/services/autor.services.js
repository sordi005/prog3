import { Autor } from "../models/Autor.js";


export const crearAutor = async (nombre, fechaNacimiento) => {
    try {
        
        if (!nombre || !fechaNacimiento) {
            throw new Error("Nombre y fecha de nacimiento son requeridos");
        }

        const autor = new Autor({ nombre, fechaNacimiento });
        const nuevoAutor = await autor.save(autor);
        return nuevoAutor;

    }catch (error) {
        console.error("Error al crear el autor:", error);
        throw error;
    }
}

export const getAllAutores = async () => {
    try{
        const autores = await Autor.find();
        return autores;
    }catch (error) {
        console.error("Error al obtener los autores:", error);
        throw error;
    }
}

export const getAutorById = async (id) => {
    try{
        if (!id){
            throw new Error("ID del autor es requerido");
        }
        const autor = await Autor.findById(id);

        if (!autor){
            throw new Error("Autor no encontrado con id: " + id);
        }

        return autor;
    }catch (error) {
        console.error("Error al obtener el autor por ID:", error);
        throw error;
    }
}

export const updateAutor = async (id, nombre, fechaNacimiento) => {
    try{
        if (!id){
            throw new Error("ID del autor es requerido");
        }
        if (!nombre || !fechaNacimiento) {
            throw new Error("Nombre y fecha de nacimiento son requeridos");
        }
        const autor = await Autor.findByIdAndUpdate(id, { nombre, fechaNacimiento }, { new: true });

        if (!autor) {
            throw new Error("Autor no encontrado con id: " + id);
        }
        return autor;
    }catch (error) {
        console.error("Error al actualizar el autor por ID:", error);
        throw error;
    }
}


export const deleteAutor = async (id) => {
    try{
        if (!id){
            throw new Error("ID del autor es requerido");
        }
        const autor = await Autor.findByIdAndDelete(id);
        return autor;
    }catch (error) {
        console.error("Error al eliminar el autor por ID:", error);
        throw error;
    }
}

export const contarAutores = async () => {
    try{
        const cantidad = await Autor.countDocuments();
        return cantidad;
    }catch (error) {
        console.error("Error al contar los autores:", error);
        throw error;
    }
}

export const existePorNombre = async (nombre) => {
    try{
        const existe = await Autor.exists({ nombre: nombre });
        if(!existe){
            return false;
        }
        return true;
    }catch (error) {
        console.error("Error al obtener el autor por nombre:", error);
        throw error;
    }
}