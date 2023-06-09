// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import { readProductsByFilter } from '../../../models/Product/product.model.js';

async function homepageController(req, res) {
  if (req.user.type === 'customer') {
    const products = await readProductsByFilter({}, 16);
    return res.render('customer/home.ejs', { products });
  }
  return res.redirect('/my-account');
}

export default homepageController;
