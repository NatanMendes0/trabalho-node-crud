const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const passport = require("passport");
const usuarioModel = require("../model/usuario");

module.exports = {
  cadastro: async function (req, res) {
    res.render("usuario/cadastro", { title: "cadastro", mensagem: null});
  },

  cadastrar: function (req, res) {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    const hash = bcrypt.hashSync(senha, saltRounds);
    const resultadoCadastro = usuarioModel.create({
      nome: nome,
      email: email,
      senha: hash,
    });
    res.redirect("/");
  },

  login: function (req, res, next){
    let user = null;
    if (typeof req.session.passport !== "undefined") {
      user = req.session.passport.user;
    }
    if (user == null) {
      if (req.query.erro == 1)
        res.render("usuario/login", {
          mensagem: "É necessário realizar login", user
        });
      else if (req.query.erro == 2)
        res.render("usuario/login", {
          mensagem: "Email e/ou senha incorretos!", user
        });
      else res.render("usuario/login", { title: "login", mensagem: null, user });
    } else {
      req.session.loggedin = true;
      res.redirect("/");
    }
  },

  logar: async function (req, res) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login?erro=2",
    });
  },

  logout: async function (req, res) {
    req.session.destroy(function (err) {
      if (err) throw err;
    });
    res.redirect("/login");
  },
};
