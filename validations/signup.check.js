const { check } = require("express-validator");

const signupValidator = [
  check("email").isEmail().withMessage("Email deve ser válido"),
  check("password", "invalid password")
    .isLength({ min: 4 })
    .custom((value, { req }) => {
      if (value !== req.body.retype_password) {
        throw new Error("As senhas devem ser iguais");
      } else {
        return value;
      }
    }),
];

module.exports = signupValidator;
