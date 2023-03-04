const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const Usuario = require("./model/usuario");

module.exports = function (passport) {
  // async function findUser(email) {
  //   let dadosBanco = await Usuario.findAll({
  //     raw: true,
  //     where: {
  //       email: email,
  //     },
  //   });
  //   if (dadosBanco.length > 0) return dadosBanco[0];
  //   else return null;
  // }

  function findUser(username) {
    return Usuario.findOne({ where: { email: username } }).then((user) => {
      if (user) {
        return user;
      } else {
        return null;
      }
    });
  }

  function findUserById(id) {
    return Usuario.findOne({ where: { id: id } }).then((user) => {
      if (user) {
        return user;
      } else {
        return null;
      }
    });
  }

  //aqui eu posso pegar o id do usuário e colocar na sessão
  passport.serializeUser((user, done) => {
    done(null, { id: user.id, nome: user.nome });
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await Usuario.findAll({
        where: {
          id: id,
        },
      });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "senha" },
       (email, senha, done) => {
        try {
          const user = findUser(email);
          // usuário inexistente
          if (!user) {
            return done(null, false);
          }

          // comparando as senhas
          const isValid = bcrypt.compareSync(senha, user.senha);
            if (!isValid) return done(null, false);
            return done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );
};
