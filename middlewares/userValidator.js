exports.userSignUpValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req.check("email").isEmail();
  req
    .check("password")
    .notEmpty()
    .isLength({ min: 6, max: 10 })
    .withMessage("password must be betwwen 6 and 10 character");

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  next();
};
