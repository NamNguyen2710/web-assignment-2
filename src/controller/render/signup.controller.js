import { readAllDistributionHub } from '../../models/DistributionHub/distributionHub.model.js';

async function signupController(req, res) {
  const distributionHubs = await readAllDistributionHub();
  return res.render('signup.ejs', { distributionHubs });
}

export default signupController;
