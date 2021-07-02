const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const usersRouter = require("./routers/users.router");
const { getUsers } = require("./controllers/users.controller");
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "xuxinha_secret" }));
app.use(express.static("public"));
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  if(req.session.user){
    res.render("index", { users: getUsers() });
  } else {
    res.redirect('/login')
  }
});

app.get("/login", (req, res) => {
  res.render("login", { erro: null});
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password));
  if(user){
    req.session.user = user;
    res.redirect("/")
  } else {
    res.render("login", { erro: "Email ou senha inválidos"});
  }
});

app.get("/signup", (req, res) => {
  res.render("signup", { errors: null, body: null });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
