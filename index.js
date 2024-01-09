const express = require('express');
const AppRouter = require('./router/AppRouter')
const cors = require('cors');
const app = express();

app.use(
    cors({
      origin: "*",
      methods: "GET, POST",
      allowedHeaders: "Content-Type, Authorization",
    })
  );


app.use(express.json());

app.use(AppRouter)