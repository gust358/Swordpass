require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const { login } = require("./controllers/login/login.js");
const { register } = require("./controllers/register/register.js");
const { homePage, changePassPage, IIfaPage, userPage, registerPage, loginPage } = require("./controllers/renderPages/pages.js");
const { sendData, addPassword, removePassword, changePassword, sendUsername } = require("./controllers/user/user.js");
const { verifyToken } = require("./controllers/token/token.js");
const { logout } = require("./controllers/logout/logout.js");
const { IIfaAuth, sendIIfaToken } = require("./controllers/2fa/twoFactorAuth.js")
const { checkDb } = require("./controllers/genericFunctions/functions.js");

checkDb();

app.use(bodyParser.json(), cookieParser(), express.static("./public"));

app.post("/login", login);
app.post("/register", register);
app.post("/addPassword", verifyToken, addPassword);
app.post("/removePassword", verifyToken, removePassword)
app.post("/logout", verifyToken, logout);
app.post("/changePassword", verifyToken, changePassword);
app.post("/IIfa", verifyToken, IIfaAuth);
app.post("/userData", verifyToken, sendData);
app.post("/username", verifyToken, sendUsername);

app.get("/", verifyToken, homePage);
app.get("/login", verifyToken, loginPage);
app.get("/register", verifyToken, registerPage);
app.get("/user", verifyToken, userPage);
app.get("/IIfa", verifyToken, IIfaPage);
app.get("/sendIIfaToken", verifyToken, sendIIfaToken);
app.get("/changePassword", verifyToken, changePassPage);

app.listen(3000, () => { console.log("ON") });