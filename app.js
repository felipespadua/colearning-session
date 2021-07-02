const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const usersRouter = require("./routers/users.router");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "xuxinha_secret" }));

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.render("index", { users: [] });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
