import {
  readProductsByFilter,
  createProduct
} from '../../../models/Product/product.model.js';

async function httpReadProducts(req, res) {
  const { search, minPrice, maxPrice } = req.query;

  const filterObj = {};
  if (search) filterObj.$text = { $search: search };
  if (minPrice || maxPrice) filterObj.price = {};
  if (minPrice) filterObj.price.$gte = minPrice;
  if (maxPrice) filterObj.price.$lte = maxPrice;

  try {
    const products = await readProductsByFilter(filterObj);
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function httpCreateProduct(req, res) {
  const newProduct = req.body;
  const { imageNames } = req;

  if (!newProduct.name || !newProduct.price || !newProduct.description)
    return res.status(400).json({ err: 'Missing required product property' });

  try {
    const createdProduct = await createProduct({
      ...newProduct,
      images: imageNames
    });
    return res.status(201).json(createdProduct);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export { httpReadProducts, httpCreateProduct };
