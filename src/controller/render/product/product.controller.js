import {
  readProductsByOwnerId,
  readProductByProductId,
  readProductsByFilter
} from '../../../models/Product/product.model.js';
import sidebarController from '../user/sidebar.controller.js';

async function productListController(req, res) {
  const sidebar = sidebarController(req.user.type);

  if (req.user.type === 'vendor') {
    const products = await readProductsByOwnerId(req.user['_id']);
    return res.render('vendor/productList.ejs', {
      user: req.user,
      products,
      sidebar
    });
  } else {
    const { search, minPrice = '', maxPrice = '' } = req.query;

    const filterObj = {};
    if (search) filterObj.$text = { $search: search };
    if (minPrice || maxPrice) filterObj.price = {};
    if (minPrice) filterObj.price.$gte = minPrice;
    if (maxPrice) filterObj.price.$lte = maxPrice;

    const products = await readProductsByFilter(filterObj);
    return res.render(`${req.user.type}/productList.ejs`, {
      user: req.user,
      products,
      sidebar,
      minPrice,
      maxPrice
    });
  }
}

async function productDetailController(req, res) {
  const { id: productId } = req.params;
  const productDetail = await readProductByProductId(productId);
  const sidebar = sidebarController(req.user.type);

  return res
    .set(
      'Content-Security-Policy',
      "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
    )
    .render(`${req.user.type}/productDetail.ejs`, {
      user: req.user,
      sidebar,
      product: productDetail.toJSON()
    });
}

function createProductController(req, res) {
  const sidebar = sidebarController(req.user.type);
  return res.render('vendor/createProduct.ejs', { user: req.user, sidebar });
}

export {
  productListController,
  productDetailController,
  createProductController
};
