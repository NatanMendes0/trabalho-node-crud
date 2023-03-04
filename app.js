const express = require("express");
const app = express();
var session = require("express-session");
const passport = require("passport");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

require("./auth")(passport);
app.use(
  session({
    secret: "2C44-4D44-WppQ38S",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

(async () => {
  const database = require("./config/db");
  const Jogo = require("./model/Jogo");
  const Usuario = require("./model/Usuario");
  const Categoria = require("./model/Categoria");
  try {
    const resultado = await database.sync();
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
})();

const jogoController = require("./controller/jogoController");
const usuarioController = require("./controller/usuarioController");

var cadastroRouter = require("./routes/cadastro");
var indexRouter = require("./routes/index");
var jogoRouter = require("./routes/jogo");
var loginRouter = require("./routes/login");

app.use("/cadastro", cadastroRouter);
app.use("/", indexRouter);
app.use("/jogo", jogoRouter);
app.use("/login", loginRouter);

app.listen(3000, function () {
  console.log("Servidor Escutando na porta 3000");
});
