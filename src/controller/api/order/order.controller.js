import {
  readOrderByOrderId,
  updateOrderByOrderId,
  createOrder
} from '../../../models/Order/order.model';
import { readAllDistributionHub } from '../../../models/DistributionHub/distributionHub.model';

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
    newOrder.products.reduce(
      (acc, cur) => acc && cur.name && cur.amount && cur.price,
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
      customer: { ...req.user },
      distributionHubs: { ...distributionHubs[randomInt] }
    });

    return res.status(201).json(createdOrder);
  } catch (err) {
    return res.json(400).json({ error: err.message });
  }
}

async function httpUpdateOrderStatus(req, res) {
  const { status, id } = req.body;

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
