// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import {
  readOrdersByHubId,
  readOrdersByCustomerId,
  readOrderByOrderId
} from '../../../models/Order/order.model.js';
import sidebarController from '../user/sidebar.controller.js';

async function orderListController(req, res) {
  const sidebar = sidebarController(req.user.type);
  const orders =
    req.user.type === 'shipper'
      ? await readOrdersByHubId(req.user.distributionHub.hubId)
      : await readOrdersByCustomerId(req.user['_id']);

  return res.render(`${req.user.type}/orderList.ejs`, {
    user: req.user,
    sidebar,
    orders
  });
}

async function orderDetailController(req, res) {
  const sidebar = sidebarController(req.user.type);
  const { id: orderId } = req.params;

  const orderDetail = await readOrderByOrderId(orderId);
  return res.render(`${req.user.type}/orderDetail.ejs`, {
    user: req.user,
    sidebar,
    order: orderDetail.toJSON()
  });
}

export { orderListController, orderDetailController };
