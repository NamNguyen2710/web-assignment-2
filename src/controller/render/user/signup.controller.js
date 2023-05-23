// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
import { readAllDistributionHub } from '../../../models/DistributionHub/distributionHub.model.js';

async function signupController(req, res) {
  const distributionHubs = await readAllDistributionHub();
  return res.render('signup.ejs', { distributionHubs });
}

export default signupController;
