// authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = "mysecretssshhhhhhh";
const expiration = "4h";

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
      // return res.status(400).json({ message: "You have no token!" });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return req;
      // return res.status(400).json({ message: "invalid token!" });
    }

    return req;
    // send to next endpoint
    // next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

// const authMiddleware = async (req, res, next) => {
//   try {
//     // Get token from request header
//     const token = req.header('Authorization').replace('Bearer ', '');
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Find user by ID and token
//     const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

//     if (!user) {
//       throw new Error();
//     }

//     // Add user and token to request object for later use
//     req.user = user;
//     req.token = token;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: 'Please authenticate.' });
//   }
// };

// const signToken = function ({ email, username, _id }) {
//     const payload = { email, username, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
// };

// module.exports = { authMiddleware, signToken };
