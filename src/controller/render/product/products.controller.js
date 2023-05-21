import {
  readProductsByOwnerId,
  readProductByProductId
} from '../../../models/Product/product.model.js';
import sidebarController from '../user/sidebar.controller.js';

async function productListController(req, res) {
  const products = await readProductsByOwnerId(req.user['_id']);
  const sidebar = sidebarController();

  return res.render('vendor/productList.ejs', {
    user: req.user,
    products,
    sidebar
  });
}

async function productDetailController(req, res) {
  const { id: productId } = req.params;
  const productDetail = await readProductByProductId(productId);
  const sidebar = sidebarController(req.user.type);

  return res.render(`${vendor ? 'vendor' : 'customer'}/productDetail.ejs`, {
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
