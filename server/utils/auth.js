// authMiddleware.js

const jwt = require('jsonwebtoken');
const Renter = require('../models/Renter');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from request header
    const token = req.header('Authorization').replace('Bearer ', '');
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find renter by ID and token
    const renter = await Renter.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!renter) {
      throw new Error();
    }

    // Add user and token to request object for later use
    req.renter = renter;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
