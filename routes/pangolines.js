const express = require("express");
const {
  updateOnPangoline,
  removeOnPangoline,
  getAllPangoline,
  getOnPangoline,
  addPangoline,
} = require("../controllers/pangolineController");
const { userById } = require("../middlewares/pangoline");
const router = express.Router();
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");

router.get("/:userId", getOnPangoline);
router.get("/", getAllPangoline);
router.post("/addPangoline", addPangoline);
router.put("/:userId", updateOnPangoline);
router.delete("/:userId", requireSignIn, removeOnPangoline);

router.param("userId", userById);

module.exports = router;
