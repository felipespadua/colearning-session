const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const signupValidator = require("../validations/signup.check");
const router = Router();

router.get("/", usersController.retornarUsuarios);
router.post("/cadastro", signupValidator, usersController.cadastrarUsuario);
router.get("/:id", usersController.retornarUsuario);
router.put("/:id", usersController.editarUsuario);
router.delete("/:id", usersController.deletarUsuario);
module.exports = router;
