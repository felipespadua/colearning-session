const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const router = Router();

router.get("/", usersController.retornarUsuarios);
router.post("/cadastro", usersController.cadastrarUsuario);

module.exports = router;
