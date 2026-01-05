const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// middleware
app.use(cookieParser());
