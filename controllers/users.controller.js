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
    if (errors.isEmpty()) {
      const { email, password, nome, idade, sexo, endereco } = req.body;
      const senhaCriptografada = bcrypt.hashSync(password, 10);
      const users = getUsers();
      const user = {
        id: users.length + 1,
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
  retornarUsuario: (req,res) =>{
    const { id } = req.params;
    const users = getUsers();
    const user = users.find(user => user.id === parseInt(id));
    if(user){
      res.render("editUser", { user, errors: undefined})
    } else {
      res.send("Usuario não encontrado")
    }
  },
  editarUsuario: (req, res) => {
      const { id } = req.params;
      const { email, password, nome, idade, sexo, endereco } = req.body;
      const senhaCriptografada = bcrypt.hashSync(password, 10);
      const user = {
        id: parseInt(id),
        email,
        password: senhaCriptografada,
        nome,
        idade,
        sexo,
        endereco,
      };
      const sucesso = updateUser(id, user);
      if (sucesso) {
        res.redirect("/");
      } else {
        res.send("Usuario não encontrado");
      }
  },
  deletarUsuario: (req,res) =>{
    const { id } = req.params;
    deleteUser(id);
    res.redirect('/')
  },
};

const updateUser = (id, user) => {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    users[index] = user;
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    return true;
  } else {
    return false;
  }
};

const deleteUser = (id) => {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === parseInt(id));
  users.splice(index, 1);
  fs.writeFileSync("./data/users.json", JSON.stringify(users));
}

const saveUser = (user) => {
  const users = getUsers();
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
