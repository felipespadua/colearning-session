const fs = require("fs");
const users = require("../data/users.json");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const usersController = {
  retornarUsuarios: (req, res) => {
    res.send(users);
  },

  cadastrarUsuario: (req, res) => {
    const errors = validationResult(req);
    console.log(errors.mapped());
    if (errors.isEmpty()) {
      const { email, password, nome, idade, sexo, endereco } = req.body;
      const senhaCriptografada = bcrypt.hashSync(password, 10);
      const user = {
        email,
        password: senhaCriptografada,
        nome,
        idade,
        sexo,
        endereco,
      };
      saveUser(user);
      res.redirect("/login");
    } else {
      res.render("signup", { body: req.body, errors: errors.mapped() });
    }
  },
};

const saveUser = (user) => {
  const usersJson = fs.readFileSync("./data/users.json", "utf8");
  const users = JSON.parse(usersJson);
  users.push(user);
  fs.writeFileSync("./data/users.json", JSON.stringify(users));
  return users;
};

const getUsers = () => {
  const usersJson = fs.readFileSync("./data/users.json", "utf8");
  const users = JSON.parse(usersJson);
  return users;
};

module.exports = { usersController, getUsers };
