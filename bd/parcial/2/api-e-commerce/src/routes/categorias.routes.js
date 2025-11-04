import express from 'express'
import { 
        createCategoria, getAllCategorias,getCategoriaById,
        updateCategoria,deleteCategoria,
        getCategoriawithProductos 

    } from "../controllers/categoria.controller.js";
    
import { isAdmin, validateToken } from "../middlewares/auth.middleware.js";


export const categoriaRoutes = express.Router();

categoriaRoutes.post('/',validateToken,isAdmin, createCategoria);
categoriaRoutes.get('/', validateToken, getAllCategorias);
categoriaRoutes.get('/:id', validateToken, getCategoriaById);
categoriaRoutes.put('/:id', validateToken,isAdmin, updateCategoria);
categoriaRoutes.delete('/:id', validateToken,isAdmin, deleteCategoria);
categoriaRoutes.get('/stats', validateToken,isAdmin, getCategoriawithProductos);