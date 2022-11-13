import { Router } from 'express';
import ordersRoutes from './orders';
import userRoutes from './users';
import productRoutes from './products';
import middleware from '../middleware/middleware';

const router = Router();

router.use('/orders', middleware.validateJwt, ordersRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
export default router;
