import jwt from 'jsonwebtoken';

import {
  readUserByUserId,
  validateLogin,
  updateUserByUserId,
  createUser
} from '../../../models/User/user.model.js';
import { readAllDistributionHub } from '../../../models/DistributionHub/distributionHub.model.js';

async function httpLogin(req, res) {
  const { username, password } = req.body;
  try {
    const user = await validateLogin(username, password);
    const signToken = jwt.sign({ id: user['_id'] }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.cookie('jwt', signToken, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function httpSignup(req, res) {
  const { body: newUser, imageName } = req;

  if (!newUser.username || !newUser.password || !newUser.type)
    return res.status(400).json({ error: 'Missing required user property' });

  if (newUser.type === 'customer' && (!newUser.name || !newUser.address))
    return res
      .status(400)
      .json({ error: 'Missing required customer property' });

  if (
    newUser.type === 'vendor' &&
    (!newUser.businessName || !newUser.businessAddress)
  )
    return res.status(400).json({ error: 'Missing required vendor property' });

  if (newUser.type === 'shipper') {
    if (!newUser.distributionHub)
      return res
        .status(400)
        .json({ error: 'Missing required shipper property' });

    const distributionHubs = await readAllDistributionHub();
    const shipperHub = distributionHubs.findIndex(
      hub => hub.id === Number(newUser.distributionHub)
    );

    if (shipperHub === -1)
      return res.status(400).json({ error: 'Invalid distribution hub' });

    newUser.distributionHub = {
      ...distributionHubs[shipperHub].toJSON(),
      hubId: distributionHubs[shipperHub].id
    };
  }

  if (imageName) newUser.avatar = imageName;

  try {
    const createdUser = await createUser(newUser);
    return res.status(201).json(createdUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function httpUpdateUser(req, res) {
  const { imageName } = req;
  try {
    const updatedUser = await updateUserByUserId({
      _id: req.user['_id'],
      avatar: imageName
    });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

function protectHttp(userRoles) {
  return async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ error: 'Please login to continue' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await readUserByUserId(decoded.id);
      if (!user)
        return res.status(401).json({ error: 'Please login to continue' });

      if (userRoles && userRoles.findIndex(role => role === user.type) === -1)
        return res.status(403).json({ error: 'Unauthorized access' });

      req.user = { ...user.toJSON() };
      next();
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  };
}

function httpLogout(req, res) {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now()),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
}

export { httpLogin, httpLogout, httpSignup, httpUpdateUser, protectHttp };
