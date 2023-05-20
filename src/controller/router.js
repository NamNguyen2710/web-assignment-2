import express from 'express';

import authRoutes from './api/auth/auth.route.js';
import orderRoutes from './api/order/order.route.js';
import productRoutes from './api/product/product.route.js';

const router = express.Router();

router.use('/api/users', authRoutes);
router.use('/api/orders', orderRoutes);
router.use('/api/products', productRoutes);

router.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'API not found!'
  });
});

export default router;
