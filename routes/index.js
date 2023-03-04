const express = require("express");
const router = express.Router();
const passport = require("passport");

const jogoController = require("../controller/jogoController");

router.get("/", jogoController.index);

module.exports = router;