import mongoose from 'mongoose';
import { createProduct } from '../../../models/Product/product.model.js';

async function httpCreateProduct(req, res) {
  const newProduct = req.body;
  const { imageNames } = req;

  if (!newProduct.name || !newProduct.price || !newProduct.description)
    return res.status(400).json({ err: 'Missing required product property' });

  try {
    const createdProduct = await createProduct({
      ...newProduct,
      images: imageNames,
      owner: {
        _ownerId: new mongoose.Types.ObjectId(req.user['_id']),
        businessName: req.user.businessName
      }
    });
    return res.status(201).json(createdProduct);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export { httpCreateProduct };
