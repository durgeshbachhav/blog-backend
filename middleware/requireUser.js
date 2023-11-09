const { error } = require('../utility/responseWrapper');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.send(error(401, 'authorization headers is required'))
  }

  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY)
    console.log(`decoded: ${JSON.stringify(decoded)}`);
    req._id = decoded.userId,
      console.log('middleware req._id', req._id);
    next();
  } catch (e) {
    return res.send(error(401, "invalid access token"))
  }
};
