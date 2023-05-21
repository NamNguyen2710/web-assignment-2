import express from 'express';

import authController from '../user/auth.controller.js';
import {
  orderDetailController,
  orderListController
} from './order.controller.js';

const router = express.Router();

router.get(
  '/:id',
  authController(['shipper', 'customer']),
  orderDetailController
);
router.get('/', authController(['vendor']), orderListController);

export default router;
