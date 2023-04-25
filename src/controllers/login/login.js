const { getUser } = require("../../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function login(req, res) {
    const username = await req.body.username;
    const password = await req.body.password;
    const user = await getUser({ username: username.toLowerCase() });

    if (user) {
        const { person_id, IIfa } = user;
        if (bcrypt.compareSync(password, user.password)) {
            if (IIfa === 0) {
                const token = jwt.sign({ userId: person_id, IIfa, IIfaAuth: false, logged: true }, process.env.SECRET1, { expiresIn: 300 });
                res.cookie("token", token, { path: "/" });
                res.send(JSON.stringify({ auth: true }));
            }
            if (IIfa === 1) {
                const authToken = jwt.sign({ userId: person_id, IIfa, IIfaAuth: false, logged: true }, process.env.SECRET2, { expiresIn: 200 });
                res.cookie("authToken", authToken);
                res.send(JSON.stringify({ auth: true }));
            }
        } else {
            res.send(JSON.stringify({ message: "Username or Password Invalid" }));
        }
    } else {
        res.send(JSON.stringify({ message: "Username or Password Invalid" }));
    }
}

module.exports = { login };