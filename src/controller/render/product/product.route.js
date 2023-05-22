import express from 'express';

import authController from '../user/auth.controller.js';
import {
  productListController,
  productDetailController,
  createProductController
} from './product.controller.js';

const router = express.Router();

router.get('/new', authController(['vendor']), createProductController);
router.get(
  '/:id',
  authController(['vendor', 'customer']),
  productDetailController
);
router.get('/', authController(['vendor', 'customer']), productListController);

export default router;
