// requerimos las variables de entorno
require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const loadModels = require("./models/relationship");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const routinesRouter = require("./routes/routines");
const activitiesRouter = require("./routes/activities");
// MIDDLEWARE -> validaciones para token
const tokenValidation = require("./middlewares/tokenValidation");

var app = express();
// cargamos la relación entre entidades de nuestra DB
loadModels();

app.use(logger("dev"));
app.use(express.json());
// VALIDACION TOKENS AL INICIAR SESION --> no necesita invocarse
app.use(tokenValidation);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/routines", routinesRouter);
app.use("/activities", activitiesRouter);

module.exports = app;
