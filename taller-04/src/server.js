const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

module.exports = { app, port };
