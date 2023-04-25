const path = require("path");

function registerPage(req, res) {
    const { userId, logged } = req.body;
    if (userId > 0 && logged === true) {
        res.redirect("/user");
    } else {
        res.sendFile(path.join(__dirname, "../../public", "register", "register.html"));
    }
}

function loginPage(req, res) {
    const { userId, logged, IIfa, IIfaAuth } = req.body;

    if (userId > 0 && logged === true && IIfa === 1 && IIfaAuth === true) {
        res.redirect("/user");
    }

    if (!userId && !logged) {
        res.sendFile(path.join(__dirname, "../../public", "login", "login.html"));
    }
    if (userId > 0 && IIfa === 1 && IIfaAuth === true) {
        res.redirect("/user");
    }
    else if (userId > 0 && IIfa === 1 && IIfaAuth === false) {
        res.redirect("/IIfa");
    }

    if (userId > 0 && IIfa === 0 && IIfaAuth === false) {
        res.redirect("/user");
    }

};

function userPage(req, res) {
    const { userId, logged, IIfa, IIfaAuth } = req.body;
    if (!userId && !logged) {
        res.redirect("/");
    }
    if (userId > 0 && IIfa === 1 && IIfaAuth === true) {
        res.sendFile(path.join(__dirname, "../../public", "user", "user.html"));
    }
    else if (userId > 0 && IIfa === 1 && IIfaAuth === false) {
        res.redirect("/IIfa");
    }

    if (userId > 0 && IIfa === 0 && IIfaAuth === false) {
        res.sendFile(path.join(__dirname, "../../public", "user", "user.html"));
    }
}

function IIfaPage(req, res) {
    const { userId, IIfaAuth } = req.body;

    if (userId > 0 && IIfaAuth === false) {
        res.sendFile(path.join(__dirname, "../../public", "IIfa", "IIfa.html"));
    } else {
        res.redirect("/");
    }
}

function changePassPage(req, res) {
    const { userId, logged, IIfa, IIfaAuth } = req.body;
    if (!userId && !logged) {
        res.redirect("/");
    }
    if (userId > 0 && logged === true && IIfa === 1 && IIfaAuth === true) {
        res.sendFile(path.join(__dirname, "../../public", "changePass", "changePass.html"));
    }
    else if (userId > 0 && logged === true && IIfa === 1 && IIfaAuth === false) {
        res.redirect("/IIfa");
    }

    if (userId > 0 && logged === true && IIfa === 0 && IIfaAuth === false) {
        res.sendFile(path.join(__dirname, "../../public", "changePass", "changePass.html"));
    }

}

module.exports = { changePassPage, IIfaPage, userPage, loginPage, registerPage };