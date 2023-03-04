const express = require("express");
const router = express.Router();

const usuarioController = require("../controller/usuarioController");

router.get("/", usuarioController.login);
router.post("/", usuarioController.logar);
router.get("/logout", usuarioController.logout);

module.exports = router;
