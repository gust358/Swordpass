const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const { token } = req.cookies;
    const { authToken } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.SECRET1, function (err, decoded) {
            if (err) {
                if (err.message === "jwt expired") { res.clearCookie("token") }
                res.clearCookie("token");
            }
            if (decoded) {
                req.body.userId = decoded.userId;
                req.body.IIfa = decoded.IIfa;
                req.body.IIfaAuth = decoded.IIfaAuth;
                req.body.logged = decoded.logged;
            };
        });
    }
    if (authToken) {
        jwt.verify(authToken, process.env.SECRET2, function (err, decoded) {
            if (err) {
                if (err.message === "jwt expired") { res.clearCookie("authToken") }
                res.clearCookie("authToken");
            }
            if (decoded) {
                req.body.userId = decoded.userId;
                req.body.IIfa = decoded.IIfa;
                req.body.IIfaAuth = decoded.IIfaAuth;
                req.body.logged = decoded.logged;
            }
        })
    }
    next();
}

module.exports = { verifyToken };