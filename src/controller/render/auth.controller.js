function protectRender(userRoles) {
  return async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.render('authenticate.ejs');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await readUserByUserId(decoded.id);
      if (!user) res.render('404.ejs');

      if (userRoles && userRoles.findIndex(role => role === user.type) === -1)
        return res.render('404.ejs');

      req.user = { ...user.toJSON() };
      next();
    } catch (err) {
      return res.render('404.ejs', { error: err.message });
    }
  };
}

export default protectRender;
