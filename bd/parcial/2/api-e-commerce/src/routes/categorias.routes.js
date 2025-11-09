import express from 'express'
import { 
        createCategoria, getAllCategorias,getCategoriaById,
        updateCategoria,deleteCategoria,
        getCategoriawithProductos 

    } from "../controllers/categoria.controller.js";
    
import { isAdmin, validateToken } from "../middlewares/auth.middleware.js";


export const categoriaRoutes = express.Router();

//Obtener estadisticas de las categorias
categoriaRoutes.get('/stats', validateToken,isAdmin, getCategoriawithProductos);

//Crear categoria
categoriaRoutes.post('/',validateToken,isAdmin, createCategoria);

//Obtener todas las categorias
categoriaRoutes.get('/', validateToken, getAllCategorias);

//Obtener categoria por ID
categoriaRoutes.get('/:id', validateToken, getCategoriaById);

//Actualizar categoria
categoriaRoutes.patch('/:id', validateToken,isAdmin, updateCategoria);

//Eliminar categoria
categoriaRoutes.delete('/:id', validateToken,isAdmin, deleteCategoria);
