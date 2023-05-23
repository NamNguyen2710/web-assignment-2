// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
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
