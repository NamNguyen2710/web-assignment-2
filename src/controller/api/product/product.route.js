import express from 'express';
import { protectHttp } from '../auth/auth.controller.js';
import { httpCreateProduct, httpReadProducts } from './product.controller.js';
import { uploadImages, handleImages } from '../../../utils/uploadFile.js';

const router = express.Router();
router
  .get('/', protectHttp(['customer']), httpReadProducts)
  .post(
    '/',
    protectHttp(['vendor']),
    uploadImages,
    handleImages('product'),
    httpCreateProduct
  );

export default router;
