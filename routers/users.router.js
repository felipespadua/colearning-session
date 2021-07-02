const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const router = Router();


router.post("/cadastro", usersController.cadastrarUsuario);

module.exports = router;