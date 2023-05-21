import express from 'express';

import authRoutes from './api/auth/auth.route.js';
import orderRoutes from './api/order/order.route.js';
import productRoutes from './api/product/product.route.js';

import signupController from './render/user/signup.controller.js';
import productRenderRoutes from './render/product/products.route.js';
import orderRenderRoutes from './render/order/order.route.js';

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

router.get('/login', (req, res) => res.render('login.ejs'));
router.get('/signup', signupController);
router.use('/products', productRenderRoutes);
router.use('/orders', orderRenderRoutes);

export default router;
