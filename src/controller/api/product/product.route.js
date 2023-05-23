// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import express from 'express';
import { protectHttp } from '../auth/auth.controller.js';
import { httpCreateProduct } from './product.controller.js';
import { uploadImages, handleImages } from '../../../utils/uploadFile.js';

const router = express.Router();
router.post(
  '/',
  protectHttp(['vendor']),
  uploadImages,
  handleImages('product'),
  httpCreateProduct
);

export default router;
