const User = require("../models/pangoline");
const Pan = require("../models/pan");

exports.getOnPangoline = (req, res) => {
  let user;
  const id = req.params.userId;

  User.findById(id).exec((err, row) => {
    if (err || !row) {
      return res.status(404).json({
        error: "user not found !",
      });
    }

    return res.status(201).json(row.friends);
  });
};

exports.addPangoline = (req, res) => {
  const pangoline = new User(req.body);
  pangoline.save((err, pan) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.send(pan);
  });
};

exports.getAllPangoline = (req, res) => {
  User.find().exec((err, rows) => {
    if (err || !rows) {
      return res.status(404).json({
        error: "user not found !",
      });
    }

    return res.status(201).json(rows);
  });
};

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "user not found !",
      });
    }

    res.json({
      user: req.profile,
    });
  });
};

exports.updateOnPangoline = (req, res) => {
  let user;
  const id = req.params.userId;

  // Pan.findOneAndUpdate(
  //   { _id: id },
  //   // { $set: req.body },
  //   // { new: true },
  //   (err, user) => {
  //     if (err) {
  //       return res.status(400).json({ err });
  //     }
  //     // req.profile.salt = undefined;

  //     // req.profile.hashed_password = undefined;
  //     res.json({
  //       user,
  //     });
  //   }
  // );

  const objToUpdate = {
    age: req.body.age,
    nourriture: req.body.nourriture,
    race: req.body.race,
    famille: req.body.famille,
  };

  Pan.findOneAndUpdate({ _id: id }, objToUpdate).exec((err, use) => {
    if (err || !use) {
      return res.status(404).json({
        error: "user not found",
      });
    }
    return res.status(200).json({
      message: "user updateed",
    });
  });
};

exports.removeOnPangoline = (req, res) => {
  let user;

  const id = req.params.userId;

  //let newuser = req.User;

  User.findOneAndRemove({ _id: id }).exec((err, use) => {
    if (err || !use) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    return res.status(200).json({
      message: "user deleted",
      id: id,
    });
  });

  // newuser.remove((err, user) => {
  //   if (err) {
  //     return res.status(404).json({
  //       error: "user not found ! ",
  //     });
  //   }

  //   res.status(204).json({
  //     message: "user deleted",
  //   });
  // });
};
