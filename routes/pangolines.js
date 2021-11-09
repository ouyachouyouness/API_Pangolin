const express = require("express");
const {
  updateOnPangoline,
  removeOnPangoline,
  getAllPangoline,
  getOnPangoline,
} = require("../controllers/pangolineController");
const { userById } = require("../middlewares/pangoline");
const router = express.Router();
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");

router.get("/:userId", requireSignIn, isAuth, getOnPangoline);
router.get("/", requireSignIn, isAuth, getAllPangoline);
router.put("/:userId", requireSignIn, isAuth, updateOnPangoline);
router.delete("/:userId", requireSignIn, isAuth, removeOnPangoline);

router.param("userId", userById);

module.exports = router;
