const express = require("express");
const {
  salam,
  signup,
  signin,
  signout,
} = require("../controllers/authController");
const { userById } = require("../controllers/pangolineController");
const { requireSignIn } = require("../middlewares/auth");
const { userSignUpValidator } = require("../middlewares/userValidator");
const router = express.Router();

router.get("/:id", userById);

router.post("/signup", userSignUpValidator, signup);
router.post("/signin", signin);
router.post("/signout", signout);

router.get("/hello", requireSignIn, (req, res) => {
  res.send("heloo therre");
});

module.exports = router;
