// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import {
  readOrderByOrderId,
  updateOrderByOrderId,
  createOrder
} from '../../../models/Order/order.model.js';
import { readAllDistributionHub } from '../../../models/DistributionHub/distributionHub.model.js';

async function httpCreateOrder(req, res) {
  const newOrder = req.body;

  if (
    !newOrder.products ||
    newOrder.products.length < 0 ||
    !newOrder.totalPrice
  )
    return res.status(400).json({
      error: 'Missing required order property'
    });

  if (
    !newOrder.products.reduce(
      (acc, cur) => acc && Boolean(cur.name && cur.amount && cur.price),
      true
    )
  )
    return res.status(400).json({
      error: 'Missing required product property'
    });

  try {
    const distributionHubs = await readAllDistributionHub();
    const randomInt = Math.floor(Math.random() * distributionHubs.length);

    const createdOrder = await createOrder({
      ...newOrder,
      customer: {
        _customerId: req.user['_id'],
        name: req.user.name,
        address: req.user.address
      },
      distributionHub: {
        hubId: distributionHubs[randomInt].id,
        name: distributionHubs[randomInt].name,
        address: distributionHubs[randomInt].address
      }
    });

    return res.status(201).json(createdOrder);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function httpUpdateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const order = await readOrderByOrderId(id);
  if (!order) return res.status(400).json({ error: 'Invalid order ID' });

  try {
    const updatedOrder = await updateOrderByOrderId({ status, id });
    return res.status(200).json(updatedOrder);
  } catch (err) {
    return res.json(400).json({ error: err.message });
  }
}

export { httpCreateOrder, httpUpdateOrderStatus };
