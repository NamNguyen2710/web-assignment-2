// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import mongoose from 'mongoose';

import product from './product.mongo.js';

async function readProductsByFilter(filters, limit = 16) {
  return product.find(filters, { __v: 0 }).sort({ name: 1 }).limit(limit);
}

async function readProductsByOwnerId(ownerId) {
  return product
    .find(
      { 'owner._ownerId': new mongoose.Types.ObjectId(ownerId) },
      { __v: 0 }
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
