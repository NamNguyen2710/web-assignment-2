import express from 'express';
import { protectHttp } from '../auth/auth.controller.js';
import { httpCreateOrder, httpUpdateOrderStatus } from './order.controller.js';

const router = express.Router();
router.post('/', protectHttp(['customer']), httpCreateOrder);
router.put('/:id', protectHttp(['shipper']), httpUpdateOrderStatus);

export default router;
