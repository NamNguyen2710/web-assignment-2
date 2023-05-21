import sidebarController from './sidebar.controller.js';

function myAccountController(req, res) {
  const sidebar = sidebarController(req.user.type);
  return res.render('myAccount.ejs', { sidebar, user: req.user });
}

export default myAccountController;
