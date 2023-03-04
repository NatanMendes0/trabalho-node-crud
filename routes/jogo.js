const express = require("express");
const router = express.Router();

const jogoController = require("../controller/jogoController");

// router.get("/adiciona", authenticationMiddleware, jogoController.create);
// router.post("/adiciona", authenticationMiddleware, jogoController.store);
// router.get("/edita/:id", authenticationMiddleware, jogoController.edit);
// router.post("/edita/:id", authenticationMiddleware, jogoController.update);
// router.get("/apaga/:id", authenticationMiddleware,jogoController.destroy);

router.get("/adiciona", jogoController.create);
router.post("/adiciona", jogoController.store);
router.get("/edita/:id", jogoController.edit);
router.post("/edita/:id", jogoController.update);
router.get("/apaga/:id", jogoController.destroy);

// function authenticationMiddleware(req, res, next){
//     if(req.isAuthenticated()) return next();
//     res.redirect('/login?erro=1');
// }

module.exports = router;