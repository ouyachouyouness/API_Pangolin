const user = require("../models/pangoline");

exports.getOnPangoline = (req, res) => {
  req.profile.salt = undefined;

  req.profile.hashed_password = undefined;
  res.json({
    user: req.profile,
  });
};

exports.getAllPangoline = (req, res) => {
  res.json({
    user: req.user,
  });
};

exports.updateOnPangoline = (req, res) => {
  user.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({ err });
      }
      req.profile.salt = undefined;

      req.profile.hashed_password = undefined;
      res.json({
        user,
      });
    }
  );
};

exports.removeOnPangoline = (req, res) => {
  let newuser = req.user;

  newuser.remove((err, user) => {
    if (err) {
      return res.status(404).json({
        error: "user not found ! ",
      });
    }

    res.status(204).json({
      message: "user deleted",
    });
  });
};
