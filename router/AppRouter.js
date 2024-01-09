const express = require("express");
const app = express();
const user = require("../model/User");

const port = 3001;

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

app.post("/cadastro", (req, res) => {
    const { fname, femail, ftelefone } = req.body;
    try {
      const newUser = {
        fname,
        femail,
        ftelefone,
      };
  
      res.status(201).json({ msg: "Usuário cadastrado com sucesso", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error");
    }
  });
  

  app.get("/:id/user", (req, res) => {
    try {
      const id = req.params.id;
      const user = {
        id,
        fname: "TestUser",
        femail: "testuser@example.com",
        ftelefone: "123456789",
      };
  
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
