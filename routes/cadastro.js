const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const Usuario = require("../model/usuario");
var saltRounds = 10;

const usuarioController = require("../controller/usuarioController");

router.get("/", usuarioController.cadastro);
router.post("/", usuarioController.cadastrar);

module.exports = router;
