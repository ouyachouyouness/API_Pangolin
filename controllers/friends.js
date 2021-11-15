const User = require("../models/pan");
const Pan = require("../models/pangoline");
// exports.addFriend = (req, res) => {
//   //const pangoline = require("./pangolineController");

//   const id = req.body._id;
//   console.log("id", id);
//   User.findById("618ed6949c5abc15440c0e78").exec((err, res) => {
//     console.log("rooow", res);
//   });
//   //   pangoline.save((err, pan) => {
//   //     if (err) {
//   //       return res.status(400).send(err);
//   //     }

//   //     res.send(pan);
//   //   });
// };

exports.addFriend = (req, res) => {
  let user;
  const id = req.body._id;
  const userId = req.body.userId;
  let data = {};

  Pan.findById(id).exec((err, row) => {
    if (err || !row) {
      return res.status(404).json({
        error: "user not found !",
      });
    }
    data = {
        _id: row._id,
        email: row.email,
        name: row.name,
        role: row.role
    };

    let friends = [];

    Pan.findById(userId).exec((err, row) => {
        if (err || !row) {
          return res.status(404).json({
            error: "user not found !",
          });
        }
        friends = row.friends;
        if (friends.find((item) => item.id === data._id) !== undefined) {

            friends.push(data);
            Pan.findOneAndUpdate({ _id: userId }, {friends: friends}).exec((err, use) => {
                if (err || !use) {
                  return res.status(404).json({
                    error: "user not found",
                  });
                }
                return res.status(200).json({
                  message: "user updateed",
                });
              });
        }
      });

  });
};

