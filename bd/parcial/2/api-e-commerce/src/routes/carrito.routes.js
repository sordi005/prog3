import express from 'express';
import { 
    createCarrito,
    getCarritoByUserId,
    getCarritoTotal,
    addProductToCarrito,
    removeProductFromCarrito,
    clearCarrito,
    deleteCarrito,
    updateCantidadProducto
} from '../controllers/carrito.controllers.js';
import { isAdmin, validateToken } from '../middlewares/auth.middleware.js';

export const carritoRoutes = express.Router();

carritoRoutes.use(validateToken);


carritoRoutes.get('/:id/total', getCarritoTotal);
carritoRoutes.get('/total', getCarritoTotal);


carritoRoutes.get('/:id', getCarritoByUserId);
carritoRoutes.get('/', getCarritoByUserId);


carritoRoutes.post('/:id', createCarrito);
carritoRoutes.post('/', createCarrito);

carritoRoutes.patch('/:id/productos/agregar', addProductToCarrito);
carritoRoutes.patch('/productos/agregar', addProductToCarrito);

carritoRoutes.patch('/:id/productos/:productoId/cantidad/', updateCantidadProducto);
carritoRoutes.patch('/productos/:productoId/cantidad/', updateCantidadProducto);

carritoRoutes.delete('/:id/productos/:productoId/', removeProductFromCarrito);
carritoRoutes.delete('/productos/:productoId/', removeProductFromCarrito);

carritoRoutes.delete('/:id/vaciar', clearCarrito);
carritoRoutes.delete('/vaciar', clearCarrito);

carritoRoutes.delete('/:id',isAdmin, deleteCarrito);
carritoRoutes.delete('/',isAdmin, deleteCarrito);

