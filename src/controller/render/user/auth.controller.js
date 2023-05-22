import jwt from 'jsonwebtoken';

import { readUserByUserId } from '../../../models/User/user.model.js';

function protectRender(userRoles) {
  return async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token)
      return res.render('404.ejs', {
        error: 'Authentication error. Please login to proceed!',
        redirectToLogin: true
      });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await readUserByUserId(decoded.id);
      if (!user)
        res.render('404.ejs', {
          error: 'Error: Invalid login token. Please login again!',
          redirectToLogin: true
        });

      if (userRoles && userRoles.findIndex(role => role === user.type) === -1)
        return res.render('404.ejs', { error: null, redirectToLogin: false });

      req.user = { ...user.toJSON() };
      next();
    } catch (err) {
      return res.render('404.ejs', {
        error: err.message,
        redirectToLogin: false
      });
    }
  };
}

export default protectRender;
