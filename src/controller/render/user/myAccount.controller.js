// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import sidebarController from './sidebar.controller.js';

function myAccountController(req, res) {
  const sidebar = sidebarController(req.user.type);
  return res.render('myAccount.ejs', { sidebar, user: req.user });
}

export default myAccountController;
