import { connectDB } from "./database.js";
import { Libro } from "./models/Libro.js";
import { crearAutor, getAllAutores, getAutorById, updateAutor, deleteAutor, contarAutores, existePorNombre } from "./services/autor.services.js";
import { createLibro, getAllLibros, getLibroById, updateLibro, deleteLibro, contarLibros, listarConNombreAutor, existePorTitulo,promedioDePaginasPorAutor} from "./services/libro.service.js";

//2Insertar al menos 3 autores y 5 libros, relacionando cada libro con un autor.


connectDB();


const traerAutores = async () => {
    const autores = await getAllAutores();
    return autores;
}



const traerLibros = async () => {
    const libros = await getAllLibros();
    return libros;
}


const autores_a_insertar = [
    { nombre: "Santiago sordi", fechaNacimiento: new Date("1990-01-01") },
    { nombre: "mariano Gomez", fechaNacimiento: new Date("1992-02-02") },
    { nombre: "Pedro Rodriguez", fechaNacimiento: new Date("1994-03-03") },
    { nombre: "sofia tejadad", fechaNacimiento: new Date("1996-04-04") },
    { nombre: "lucas garcia", fechaNacimiento: new Date("1998-05-05") },
]

const libros_a_insertar = [
    { titulo: "El principito", paginas: 100, categorias: ["aventura", "fantasia"] },
    { titulo: "La vuelta al mundo en 80 dias", paginas: 200, categorias: ["aventura", "ciencia ficcion"] },
    { titulo: "La odisea", paginas: 300, categorias: ["aventura", "poesia"] },
    { titulo: "El arte de la guerra", paginas: 400, categorias: ["guerra", "estrategia"] },
    { titulo: "El codigo da vinci", paginas: 500, categorias: ["suspenso", "thriller"] },
    { titulo: "El poder del ahora", paginas: 600, categorias: ["autoayuda", "inspiracion"] },
    { titulo: "El arte de la guerra", paginas: 700, categorias: ["guerra", "estrategia"] },
    { titulo: "El poder del ahora", paginas: 800, categorias: ["autoayuda", "inspiracion"] },
    { titulo: "El arte de la guerra", paginas: 900, categorias: ["guerra", "estrategia"] },
    { titulo: "El poder del ahora", paginas: 1000, categorias: ["autoayuda", "inspiracion"] },
    { titulo: "El arte de la guerra", paginas: 1100, categorias: ["guerra", "estrategia"] }
]

const insertarDatos = async () => {
    try{

        for (const autor of autores_a_insertar) {
            
            if(await existePorNombre(autor.nombre)){
                console.log(`x - Autor ${autor.nombre} ya existe`);
            }else{
                await crearAutor(autor.nombre, autor.fechaNacimiento);
                console.log(JSON.stringify(autor,null,2) + " Autor creado");
            }
        }
        const autoresTraidos = await traerAutores();
        
        let contador = 0;
        for (const libro of libros_a_insertar) {
            if(contador >= autoresTraidos.length){
                contador = 0;
            }
            
            libro.author_id = autoresTraidos[contador]._id;
            console.log(libro.author_id);
            
            contador++;

            if(await existePorTitulo(libro.titulo)){
                console.log(`Libro ${libro.titulo} ya existe`);

            }else{
                await createLibro(libro.titulo, libro.paginas, libro.categorias, libro.author_id);
                console.log(JSON.stringify(libro,null,2) + " Libro creado");
            }

        }

        console.log("Datos insertados correctamente");

    }catch (error) {
        console.error("Error al insertar datos:", error);
        throw error;
    }
}


await insertarDatos();

//traer libros con nombre del autor
const libroConNombreAutor =await listarConNombreAutor();
console.log('Libros con nombre del autor:', libroConNombreAutor);

//actualizar libro 
const libroAActualizar = await getLibroById(libroConNombreAutor[0]._id);
console.log('Libro a actualizar:', libroAActualizar);


const libroActualizado = await updateLibro(libroAActualizar._id, libroAActualizar.titulo, 70, libroAActualizar.categorias, libroAActualizar.author_id);
console.log('Libro actualizado:', libroActualizado);

//eliminar un autor con sus libros 
const eliminarAutorConSusLibros = async (id) => {
    try{
        if(!id){
            throw new Error('ID del autor es requerido');
        } 
        if(await contarAutores() <= 1){
            throw new Error('No hay autores para eliminar');
        }
        const autor = await getAutorById(id);
        if(!autor){
            throw new Error('Autor no encontrado');
        }
        if(await contarLibros() <= 1){
            throw new Error('No hay libros para eliminar');
        }
        const librosEliminados = await Libro.deleteMany({ author_id: id });
        console.log('Libros eliminados correctamente');
        const autorEliminado = await deleteAutor(id);
        console.log('Autor eliminado correctamente');
    }catch (error) {
        console.error('Error al eliminar el autor con sus libros:', error);
        throw error;
    }
}

const autores = await getAllAutores();

const autorAEliminar = autores[0];

console.log('Autor a eliminar con sus libros:', autorAEliminar);


await eliminarAutorConSusLibros(autorAEliminar._id);

//promedio de paginas por autor
const promedioDePaginasPorAutorResult = await promedioDePaginasPorAutor();
console.log('Promedio de paginas por autor:', promedioDePaginasPorAutorResult);