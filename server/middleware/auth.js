const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleWare = async (req, res, next) => {
  try {
    const checkAuthToken = req.headers.authorization;
    if (!checkAuthToken) {
      res.status(401).send({
        status: 'failed',
        message: 'No Authorization Token Found!',
      });
      return;
    }
    const token = checkAuthToken.split(' ')[1];

    const decoded = JWT.verify(token, JWT_SECRET);
    const id = decoded.id;
    req.user = id;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).send({
      status: 'failed',
      message: 'Token is not valid!',
    });
  }
};

module.exports = authMiddleWare;
