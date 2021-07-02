const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const signupValidator = require("../validations/signup.check");
const router = Router();

router.get("/", usersController.retornarUsuarios);
router.post("/cadastro", signupValidator, usersController.cadastrarUsuario);

module.exports = router;
