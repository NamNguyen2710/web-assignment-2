import express from 'express';

import authController from '../user/auth.controller.js';
import {
  productListController,
  productDetailController,
  createProductController
} from './products.controller.js';

const router = express.Router();

router.get('/new', authController(['vendor']), createProductController);
router.get(
  '/:id',
  authController(['vendor', 'customer']),
  productDetailController
);
router.get('/', authController(['vendor']), productListController);

export default router;
