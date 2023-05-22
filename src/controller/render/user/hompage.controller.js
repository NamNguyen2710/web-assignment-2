import { readProductsByFilter } from '../../../models/Product/product.model.js';

async function homepageController(req, res) {
  if (req.user.type === 'customer') {
    const products = await readProductsByFilter({}, 16);
    return res.render('customer/home.ejs', { products });
  }
  return res.redirect('/my-account');
}

export default homepageController;
