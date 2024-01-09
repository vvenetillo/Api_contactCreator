const express = require('express');
const AppRouter = require('./router/AppRouter')
const app = express();




app.use(express.json());

app.use(AppRouter)