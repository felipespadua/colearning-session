const users = [];

const usersController = {
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
    users.push(user);
    res.send(users);
  },
};

module.exports = usersController;
