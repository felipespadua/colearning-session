const fs = require('fs')
const users = require('../data/users.json')

const usersController = {
  retornarUsuarios: (req,res) => {
    res.send(users)
  },

  cadastrarUsuario: (req, res) => {
    const { email, password, retype_password, nome, idade, sexo, endereco } = req.body;
    const user = {
      email,
      password,
      nome,
      idade,
      sexo,
      endereco,
    };
    const users = saveUser(user)
    res.send(users);
  },
};


const saveUser = (user)  => {
  const usersJson = fs.readFileSync("./data/users.json", 'utf8')
  const users = JSON.parse(usersJson)
  users.push(user)
  fs.writeFileSync("./data/users.json", JSON.stringify(users))
  return users;
}


module.exports = usersController;
