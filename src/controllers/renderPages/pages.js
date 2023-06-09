const path = require("path");

function homePage(req, res) {
    const { userId, logged } = req.body;
    if (userId && logged === true) {
        res.redirect("/user");
    } else {
        res.sendFile(path.join(__dirname, "../../public", "home", "home.html"));
    }
}

function registerPage(req, res) {
    const { userId, logged } = req.body;
    if (userId && logged === true) {
        res.redirect("/user");
    } else {
        res.sendFile(path.join(__dirname, "../../public", "register", "register.html"));
    }
}

function loginPage(req, res) {
    const { userId, logged, IIfa, IIfaAuth } = req.body;

    if (userId && logged === true && IIfa === 1 && IIfaAuth === true) {
        res.redirect("/user");
    }

    if (!userId && !logged) {
        res.sendFile(path.join(__dirname, "../../public", "login", "login.html"));
    }
    if (userId && IIfa === 1 && IIfaAuth === true) {
        res.redirect("/user");
    }
    else if (userId && IIfa === 1 && IIfaAuth === false) {
        res.redirect("/IIfa");
    }

    if (userId && IIfa === 0 && IIfaAuth === false) {
        res.redirect("/user");
    }

};

function userPage(req, res) {
    const { userId, logged, IIfa, IIfaAuth } = req.body;
    if (!userId && !logged) {
        res.redirect("/");
    }
    if (userId && IIfa === 1 && IIfaAuth === true) {
        res.sendFile(path.join(__dirname, "../../public", "user", "user.html"));
    }
    else if (userId && IIfa === 1 && IIfaAuth === false) {
        res.redirect("/IIfa");
    }

    if (userId && IIfa === 0 && IIfaAuth === false) {
        res.sendFile(path.join(__dirname, "../../public", "user", "user.html"));
    }
}

function IIfaPage(req, res) {
    const { userId, IIfaAuth } = req.body;

    if (userId && IIfaAuth === false) {
        res.sendFile(path.join(__dirname, "../../public", "IIfa", "IIfa.html"));
    } else {
        res.redirect("/user");
    }
}

function changePassPage(req, res) {
    const { userId, logged, IIfa, IIfaAuth } = req.body;
    if (!userId && !logged) {
        res.redirect("/");
    }
    if (userId && IIfa === 1 && IIfaAuth === true) {
        res.sendFile(path.join(__dirname, "../../public", "changePass", "changePass.html"));
    }
    else if (userId && IIfa === 1 && IIfaAuth === false) {
        res.redirect("/IIfa");
    }

    if (userId && IIfa === 0 && IIfaAuth === false) {
        res.sendFile(path.join(__dirname, "../../public", "changePass", "changePass.html"));
    }

}

module.exports = { homePage, changePassPage, IIfaPage, userPage, loginPage, registerPage };