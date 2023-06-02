const User = require('../models/User');


const userMiddleware = async (req, res, next) => {
  console.log(req.session)
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
        next();
      } else {
        req.session.userId = null;
        res.redirect('/login');
      }
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
};

module.exports = userMiddleware;
