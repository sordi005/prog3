import express from "express";
import { 
    createOrder,
    getOrders,
    getOrderById,
    getOrdersByUserId,
    updateOrderStatus,
    getOrdersStats,
    updateOrder,
    deleteOrder
} from "../controllers/order.controller.js";
import { validateToken, isAdmin } from "../middlewares/auth.middleware.js";

const orderRoutes = express.Router();

// Ruta de prueba - SIN AUTENTICACIÓN
orderRoutes.get('/test', (req, res) => {
    res.json({ message: 'Las rutas de órdenes están funcionando!' });
});

// Todas las rutas requieren autenticación
orderRoutes.use(validateToken);

orderRoutes.post('/', createOrder);

orderRoutes.get('/', getOrders);

orderRoutes.get('/stats', isAdmin, getOrdersStats);

// Obtener órdenes de un usuario específico
orderRoutes.get('/user/:userId',isAdmin, getOrdersByUserId);
orderRoutes.get('/user', getOrdersByUserId);

// Obtener orden por ID
orderRoutes.get('/:id', getOrderById);

// Actualizar estado de orden (solo admin)
orderRoutes.patch('/:id/status', isAdmin, updateOrderStatus);

// Rutas no recomendadas (protegidas)
orderRoutes.put('/:id', isAdmin, updateOrder);
orderRoutes.delete('/:id', isAdmin, deleteOrder);

export { orderRoutes };

