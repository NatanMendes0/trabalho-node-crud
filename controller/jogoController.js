const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const jogoModel = require("../model/jogo");
const categoriaModel = require("../model/categoria");

module.exports = {
  index: async function (req, res) {
    let user = null;
    if (typeof req.session.passport !== "undefined") {
      user = req.session.passport.user;
    }
    let dados = await jogoModel.findAll();
    let dadosCategoria = await categoriaModel.findAll();
    res.render("jogo/index", {
      dadosjogo: dados,
      dadosCategoria: dadosCategoria,
      user,
    });
  },

  create: async function (req, res) {
    let user = null;
    if (typeof req.session.passport !== "undefined") {
      user = req.session.passport.user;
    }
    let dadosCategoria = await categoriaModel.findAll();
    dadosCategoria.forEach((element) => {
      console.log(element.dataValues);
    });
    res.render("jogo/adicionajogo", { dadosCategoria: dadosCategoria, user });
  },

  store: async function (req, res) {
    var formidable = require("formidable");
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      var oldpath = files.imagem.filepath;
      var hash = crypto
        .createHash("md5")
        .update(Date.now().toString())
        .digest("hex");
      var nomeimg = hash + "." + files.imagem.mimetype.split("/")[1];
      var newpath = path.join(__dirname, "../public/imagens/", nomeimg);
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
      const resultadoCadastro = jogoModel.create({
        nome: fields["nome"],
        descricao: fields["descricao"],
        preco: fields["preco"],
        categoria_id: fields["categoria_id"],
        imagem: nomeimg,
      });
      res.redirect("/");
    });
  },

  edit: async function (req, res) {
    let user = null;
    if (typeof req.session.passport !== "undefined") {
      user = req.session.passport.user;
    }
    var id = req.params.id;
    let dados = await jogoModel.findAll({
      where: {
        id: id,
      },
    });
    let dadosCategoria = await categoriaModel.findAll();
    dadosCategoria.forEach((element) => {
      console.log(element.dataValues);
    });
    res.render("jogo/editajogo", { dadosjogo: dados, dadosCategoria: dadosCategoria, user });
  },

  update: function (req, res) {
    var formidable = require("formidable");
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      var id = req.params.id;
      var nome = fields["nome"];
      var descricao = fields["descricao"];
      var preco = fields["preco"];
      var categoria_id = fields["categoria_id"];
      if (files.imagem.size > 0) {
        var oldpath = files.imagem.filepath;
        var hash = crypto
          .createHash("md5")
          .update(Date.now().toString())
          .digest("hex");
        var nomeimg = hash + "." + files.imagem.mimetype.split("/")[1];
        var newpath = path.join(__dirname, "../public/imagens/", nomeimg);
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
        });
        jogoModel.update(
          {
            nome: nome,
            descricao: descricao,
            preco: preco,
            imagem: nomeimg,
            categoria_id: categoria_id,
          },
          { where: { id: id } }
        );
      } else {
        jogoModel.update(
          {
            nome: nome,
            descricao: descricao,
            preco: preco,
            categoria_id: categoria_id,
          },
          { where: { id: id } }
        );
      }
    });
    res.redirect("/");
  },

  destroy: async function (req, res) {
    var id = req.params.id;
    jogoModel
      .findAll({
        where: { id: id },
      })
      .then((result) => {
        var img = path.join(
          __dirname,
          "../public/imagens/",
          result[0]["imagem"]
        );
        fs.unlink(img, (err) => {});
      })
      .catch((err) => console.error(err));
    jogoModel.destroy({
      where: { id: id },
    });
    res.redirect("/");
  },
};
