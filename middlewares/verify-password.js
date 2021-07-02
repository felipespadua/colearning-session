const verifyPassword = (req, res, next) => {
  const { password, retype_password } = req.body;
  password === retype_password ? next() : res.render("/signup", { erro: "As senhas precisam ser iguais" });
};

module.exports = verifyPassword;