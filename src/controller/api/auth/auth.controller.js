import jwt from 'jsonwebtoken';

import {
  readUserByUserId,
  validateLogin,
  updateUserByUserId,
  createUser
} from '../../../models/User/user.model.js';

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
    return res.json(400).json({ error: err.message });
  }
}

async function httpSignup(req, res) {
  const newUser = req.body;
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

  if (
    newUser.type === 'shipper' &&
    (!newUser.distributionHub ||
      !newUser.distributionHub.hubId ||
      !newUser.distributionHub.name ||
      !newUser.distributionHub.address)
  )
    return res.status(400).json({ error: 'Missing required shipper property' });

  try {
    const createdUser = await createUser(newUser);
    return res.status(201).json(createdUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function httpUpdateUser(req, res) {
  const { avatar } = req.body;
  try {
    const updatedUser = await updateUserByUserId({
      _id: req.user['_id'],
      avatar
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
      if (!user) res.status(401).json({ error: 'Please login to continue' });

      if (userRoles && userRoles.findIndex(role => role === user.type) === -1)
        return res.status(403).json({ error: 'Unauthorized access' });

      req.user = { ...user.toJSON() };
      next();
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  };
}

function getSidebarObj(req, res, next) {
  const customerSidebar = [
    { title: 'My account', url: '/my-account' },
    { title: 'Search products', url: '/' },
    { title: 'Shopping cart', url: '/shopping-cart' },
    { title: 'My orders', url: '/orders' }
  ];
  const vendorSidebar = [
    { title: 'My account', url: '/my-account' },
    { title: 'My products', url: '/products' },
    { title: 'Add new product', url: '/products/new' }
  ];
  const shipperSidebar = [
    { title: 'My account', url: '/my-account' },
    { title: 'Distribution hub orders', url: '/orders' }
  ];

  switch (req.user.type) {
    case 'customer':
      req.sidebar = customerSidebar;
      break;
    case 'vendor':
      req.sidebar = vendorSidebar;
      break;
    case 'shipper':
      req.sidebar = shipperSidebar;
      break;
    default:
      break;
  }
}

async function protectRender(req, res) {}

async function renderMyAccount(req, res) {}

export { httpLogin, httpSignup, httpUpdateUser, protectHttp };