import mongoose from 'mongoose';

import product from './product.mongo.js';

async function readProductsByFilter(filters) {
  return product.find(filters, { __v: 0 }).sort({ name: 1 });
}

async function readProductsByOwnerId(ownerId) {
  return product
    .find(
      { 'owner._ownerId': new mongoose.Types.ObjectId(ownerId) },
      { _id: 0, __v: 0 }
    )
    .sort({ name: 1 });
}

async function readProductByProductId(prodId) {
  return product.findOne(
    { _id: new mongoose.Types.ObjectId(prodId) },
    { __v: 0 }
  );
}

async function createProduct(newProduct) {
  return product.create(newProduct);
}

export {
  readProductByProductId,
  readProductsByFilter,
  readProductsByOwnerId,
  createProduct
};
