import mongoose from 'mongoose';

import order from './order.mongo.js';

const DEFAUTL_ORDER_ID = 0;

async function readOrdersByHubId(hubId) {
  return order
    .find(
      { 'distributionHub.hubId': hubId, status: 'active' },
      { _id: 0, __v: 0 }
    )
    .sort({ id: -1 });
}

async function readOrdersByCustomerId(customerId) {
  return order
    .find(
      { 'customer._customerId': new mongoose.Types.ObjectId(customerId) },
      { _id: 0, __v: 0 }
    )
    .sort({ id: -1 });
}

async function readOrderByOrderId(orderId) {
  return order.findOne({ id: orderId });
}

async function readLatestOrderId() {
  const latestOrder = await order.findOne().sort('-id');
  return latestOrder?.id ?? DEFAUTL_ORDER_ID;
}

async function updateOrderByOrderId(newOrder) {
  return await order.findOneAndUpdate(
    { id: newOrder.id },
    { $set: newOrder },
    {
      upsert: true,
      returnDocument: 'after',
      projection: { _id: 0, __v: 0 }
    }
  );
}

async function createOrder(orderInfo) {
  const latestOrderId = await readLatestOrderId();
  const newOrder = Object.assign({}, orderInfo, {
    id: latestOrderId + 1,
    status: 'active'
  });

  const createdOrder = await updateOrderByOrderId(newOrder);
  return createdOrder;
}

export {
  readLatestOrderId,
  readOrderByOrderId,
  readOrdersByCustomerId,
  readOrdersByHubId,
  updateOrderByOrderId,
  createOrder
};
