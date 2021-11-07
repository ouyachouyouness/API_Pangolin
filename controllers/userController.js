const User = require("../models/user");

exports.salam = (req, res) => {
  res.send("users moduleee");
};

exports.signup = (req, res) => {
  const user = new User(req.body);
  console.log(user.email);

  user.save((err, user) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.send(user);
  });
};
