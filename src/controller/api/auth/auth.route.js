import express from 'express';
import {
  httpUpdateUser,
  httpLogin,
  httpSignup,
  protectHttp
} from './auth.controller.js';

const router = express.Router();

router.post('/login', httpLogin);
router.post('/signup', httpSignup);

router.put('/account-info', protectHttp(), httpUpdateUser);

export default router;
