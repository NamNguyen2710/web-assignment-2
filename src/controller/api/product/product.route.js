import express from 'express';
import { protectHttp } from '../auth/auth.controller.js';
import { httpCreateProduct, httpReadProducts } from './product.controller.js';

const router = express.Router();
router
  .get(protectHttp(['customer']), httpReadProducts)
  .post(protectHttp(['vendor']), httpCreateProduct);

export default router;
