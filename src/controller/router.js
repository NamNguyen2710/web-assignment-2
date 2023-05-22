import express from 'express';

import authRoutes from './api/auth/auth.route.js';
import orderRoutes from './api/order/order.route.js';
import productRoutes from './api/product/product.route.js';

import signupController from './render/user/signup.controller.js';
import authController from './render/user/auth.controller.js';
import myAccountController from './render/user/myAccount.controller.js';
import productRenderRoutes from './render/product/product.route.js';
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
router.get('/my-account', authController(), myAccountController);
router.use('/products', productRenderRoutes);
router.use('/orders', orderRenderRoutes);
router.get('/cart', authController(['customer']), (req, res) =>
  res.render('customer/cart.ejs')
);
router.get('/', authController(), (req, res) => {
  if (req.user.type === 'customer') return res.render('customer/home.ejs');
  return res.redirect('/my-account');
});
router.use('/*', (req, res) =>
  res.render('404.ejs', { error: null, redirectToLogin: false })
);

export default router;
