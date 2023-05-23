// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import express from 'express';
import {
  httpUpdateUser,
  httpLogin,
  httpLogout,
  httpSignup,
  protectHttp
} from './auth.controller.js';
import { uploadImage, handleImage } from '../../../utils/uploadFile.js';

const router = express.Router();

router.post('/login', httpLogin);
router.get('/logout', httpLogout);
router.post('/signup', uploadImage, handleImage('user'), httpSignup);

router.put(
  '/account-info',
  protectHttp(),
  uploadImage,
  handleImage('user'),
  httpUpdateUser
);

export default router;
