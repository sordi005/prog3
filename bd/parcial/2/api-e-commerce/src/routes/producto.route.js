import express from 'express'
import { isAdmin, isUser, validateToken } from '../middlewares/auth.middleware.js';
import { createProduct, getAllProducts, 
        getProductById, updateProduct, deleteProduct,
        filterProductByRangePrice, updateStock, 
        addResenaToProduct} from '../controllers/product.controller.js';

export const productoRoutes = express.Router();


productoRoutes.post('/',validateToken,isAdmin, createProduct);
productoRoutes.get('/', validateToken, getAllProducts);
productoRoutes.get('/:id', validateToken, getProductById);
productoRoutes.put('/:id', validateToken,isAdmin, updateProduct);
productoRoutes.patch('/:id', validateToken,isAdmin, updateStock);
productoRoutes.delete('/:id', validateToken,isAdmin, deleteProduct);

productoRoutes.get('/top', validateToken, filterProductByRangePrice); 
productoRoutes.get('/filtrar', validateToken, filterProductByRangePrice);

productoRoutes.post('/:id/resenas', validateToken,isUser,addResenaToProduct);
