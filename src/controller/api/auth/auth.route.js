import express from 'express';
import {
  httpUpdateUser,
  httpLogin,
  httpSignup,
  protectHttp
} from './auth.controller.js';
import { uploadImage, handleImage } from '../../../utils/uploadFile.js';

const router = express.Router();

router.post('/login', httpLogin);
router.post('/signup', httpSignup);

router.put(
  '/account-info',
  protectHttp(),
  uploadImage,
  handleImage('user'),
  httpUpdateUser
);

export default router;
