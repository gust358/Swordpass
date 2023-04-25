const { insertUser, getUser } = require("../../database/database.js");
const { generateHash } = require("../genericFunctions/functions");

async function register(req, res) {

    const frontUser = await req.body;

    let dbUser1 = await getUser({ email: frontUser.email.toLowerCase() });
    if (dbUser1) { return res.send(JSON.stringify({ type: "email", message: "email already exists", success: false })) }
    let dbUser2 = await getUser({ username: frontUser.username.toLowerCase() });
    if (dbUser2) { return res.send(JSON.stringify({ type: "username", message: "username already exists", success: false })) };

    if (frontUser.password !== frontUser.confirm_password) {
        return res.send(JSON.stringify({ type: "password", message: "Passwords not match", success: false }));
    }

    if (!dbUser1 && !dbUser2) {
        if (frontUser.email.includes("@") && frontUser.email.includes(".com")) {
            const hash = generateHash(frontUser.password);
            await insertUser(frontUser.username.toLowerCase(), hash, frontUser.email.toLowerCase());
            res.send(JSON.stringify({ success: true })).status(200);
        } else {
            res.send(JSON.stringify({ type: "email", message: "email doesn't look like an email", success: false }))
        };
    }
};



module.exports = { register };