import express from 'express'
import { isAdmin, isUser, validateToken } from '../middlewares/auth.middleware.js';
import { createProduct, getAllProducts, 
        getProductById, updateProduct, deleteProduct,
        filterProductByRangePrice, updateStock,
        getTopPructsByResenas} from '../controllers/product.controller.js';

export const productoRoutes = express.Router();

productoRoutes.post('/',validateToken,isAdmin, createProduct);


productoRoutes.put('/:id', validateToken,isAdmin, updateProduct);

productoRoutes.patch('/:id/stock', validateToken,isAdmin, updateStock);

productoRoutes.delete('/:id', validateToken,isAdmin, deleteProduct);

productoRoutes.get('/', validateToken, getAllProducts);

productoRoutes.get('/filtrar', validateToken, filterProductByRangePrice);

productoRoutes.get('/top', validateToken, getTopPructsByResenas);

productoRoutes.get('/:id', validateToken, getProductById);
