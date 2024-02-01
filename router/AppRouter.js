const express = require("express");
const app = express();
const User = require("../model/User");
require('dotenv').config();
const cors = require('cors');
const mysql = require('mysql2');
const { STRING } = require("sequelize");

const users = [];

const port = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conexão com MySQL estabelecida com sucesso");
  }
});


app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
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

    const sql = "INSERT INTO clientes (nome, email, telefone, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
    const values = [username, email, telefone, new Date(), new Date()];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao inserir no MySQL:", err);
        return res.status(500).send("Erro interno no servidor");
      }

      res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.get("/users", (req, res) => {
  try {
    const sql = "SELECT * FROM clientes";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Erro ao consultar no MySQL:", err);
        return res.status(500).send("Erro interno no servidor");
      }
      
      res.status(200).json({ users: result });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});



app.get("/:id/user", (req, res) => {
  try {
    const id = req.params.id;

    const sql = "SELECT * FROM clientes WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erro ao consultar no MySQL:", err);
        return res.status(500).send("Erro interno no servidor");
      }

      if (result.length === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json(result[0]);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});



app.put("/users/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, telefone } = req.body;

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ msg: "User not found" });
    }

    users[userIndex] = {
      id,
      username,
      email,
      telefone
    };

    res.status(200).json({ msg: "User updated successfully", user: users[userIndex] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.delete("/users/:id", (req, res) => {
  try {
    const id = req.params.id;

    const sqlDelete = "DELETE FROM clientes WHERE id = ?";
    db.query(sqlDelete, [id], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error("Erro ao excluir no MySQL:", deleteErr);
        return res.status(500).send("Erro interno no servidor");
      }

      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json({ msg: "User deleted successfully", userId: id });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});




module.exports = app;
