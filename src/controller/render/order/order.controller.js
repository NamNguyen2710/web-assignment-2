import {
  readOrdersByHubId,
  readOrdersByCustomerId,
  readOrderByOrderId
} from '../../../models/Order/order.model';
import sidebarController from '../user/sidebar.controller';

async function orderListController(req, res) {
  const sidebar = sidebarController(req.user.type);
  const orders =
    req.user.type === 'shipper'
      ? await readOrdersByHubId(req.user.distributionHub.hubId)
      : await readOrdersByCustomerId(req.user['_id']);

  return res.render(`${req.user.type}/orderList.ejs`, {
    user: req.user,
    sidebar,
    orders: orders.toJSON()
  });
}

async function orderDetailController(req, res) {
  const sidebar = sidebarController(req.user.type);
  const { id: orderId } = req.params;

  const orderDetail = await readOrderByOrderId(orderId);
  return res.render('');
}

export { orderListController, orderDetailController };