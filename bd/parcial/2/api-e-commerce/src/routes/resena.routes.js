import express from 'express';
import {
    getAllResenas,
    getResenasByProductId,
    getTopResenasPromedio,
    createResena,
    updateResena,
    deleteResena
} from '../controllers/resena.controller.js';
import { validateToken, isAdmin } from '../middlewares/auth.middleware.js';

const resenaRoutes = express.Router();

resenaRoutes.use(validateToken);

resenaRoutes.get('/', getAllResenas);

resenaRoutes.get('/product/:productId', getResenasByProductId);

resenaRoutes.get('/top', getTopResenasPromedio);

resenaRoutes.post('/', createResena);
resenaRoutes.post('/:userId', createResena);

resenaRoutes.put('/:id', updateResena);

resenaRoutes.delete('/:id', deleteResena);

export default resenaRoutes;
