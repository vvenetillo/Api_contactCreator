const express = require("express");
const app = express();
const User = require("../model/User");
require('dotenv').config();
const cors = require('cors');
const mysql = require('mysql2/promise'); 

const port = process.env.PORT || 3001;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
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

app.post("/register", async (req, res) => {
  try {
    const { username, email, telefone } = req.body;

    const sql = "INSERT INTO clientes (nome, email, telefone, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
    const values = [username, email, telefone, new Date(), new Date()];

    const [result] = await db.query(sql, values);
    res.status(201).json({ msg: "Usuário cadastrado com sucesso", insertId: result.insertId });
  } catch (error) {
    console.error("Erro ao inserir no MySQL:", error);
    res.status(500).send("Erro interno no servidor");
  }
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM meubanco.clientes");
    res.status(200).json({ users: rows });
  } catch (error) {
    console.error("Erro ao consultar no MySQL:", error);
    res.status(500).send("Erro interno no servidor");
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
