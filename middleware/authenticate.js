var {User} = require('./../models/user');
var {Admin} = require('./../models/admin');

var authenticate = (req,res,next) => {
  var token = req.session.auth;

  User.findByToken(token).then((user)=>{
    if(!user)
    {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  })
  .catch((err)=>{
    res.status(401).send(req.session.token);
  });
};

var authenticateAdmin = (req,res,next) => {
  var token = req.session.auth;

  Admin.findByToken(token).then((admin)=>{
    if(!admin)
    {
      return Promise.reject();
    }
    console.log(admin);
    req.admin = admin;
    req.token = token;
    next();
  })
  .catch((err)=>{
    res.status(401).send("errrr");
  });
};

module.exports = {authenticate,authenticateAdmin};
