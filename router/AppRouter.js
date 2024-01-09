const express = require("express");
const app = express();
const User = require("../model/User"); 
require('dotenv').config()
const cors = require('cors');

const users = []

const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    methods: "GET, POST",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.listen(port, () => {
  try {
    console.log("Rodando na porta " + port);
  } catch (error) {
    console.log(error);
  }
});

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo a API" });
});

app.post("/register", (req, res) => {
  try {
    const { username, email, telefone } = req.body;

    const newUser = new User(username, email, telefone)

    users.push(newUser);

    res.status(201).json({ msg: "Usuário cadastrado com sucesso", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.get("/users", (req, res) => {
  try {
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.get("/:id/user", (req, res) => {
  try {
    const id = req.params.id;
    const user = users.find(user => user.id === id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

module.exports = app;
