const User = require("../models/user");

exports.salam = (req, res) => {
  res.send("users moduleee");
};

exports.signup = (req, res) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.send(user);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found with this email, Please SignUp",
      });
    }

    if (!user.authenticate()) {
      return res.status(401).json({
        error: "Email and Password dont Match !",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    set.cookie("token", token, { expire: new Date() + 824524 });

    const { _id, name, email, role } = user;
    
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};
