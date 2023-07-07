const { changeUserPassword, removeService, insertService, getUserPasswords, getUser } = require("../../database/database.js");
const { generateHash, generatePassword } = require("../genericFunctions/functions");
const bcrypt = require("bcryptjs");

async function sendData(req, res) {
    const { userId, IIfa } = req.body;
    if (userId) {
        const passwords = await getUserPasswords(userId);
        res.json({ passwords, IIfa }).status(200);
    } else {
        res.json(JSON.stringify({ message: "Access Denied" }));
    }
}

async function addPassword(req, res) {
    const id = req.body.userId;
    const { service } = req.body;
    if (!service) { return res.json({ message: "Insert service name", success: false }) };
    const array = await getUserPasswords(id);
    let have = false;
    array.forEach((it) => {
        if (it.service === service.toLowerCase()) {
            have = true;
            return;
        }
    });
    if (have === true) {
        return res.json({ message: "Service already exists", success: false });
    }
    const hash = generatePassword();
    await insertService(id, service.toLowerCase(), hash);
    res.json({ message: "Service Successfully Add", success: true });
}


async function removePassword(req, res) {
    const { service_id, userId, password } = req.body;
    const dbUser = await getUser({ id: userId });
    if (bcrypt.compareSync(password.toString(), dbUser.password)) {
        await removeService(userId, service_id);
        res.json({ message: "Successfully removed", success: true });
    } else {
        res.json({ message: "Invalid Password", success: false })
    }
}

async function changePassword(req, res) {
    const { userId, oldPassword, newPassword, confirmNewPassword } = req.body;
    const dbUser = await getUser({ id: userId });
    if (bcrypt.compareSync(oldPassword.toString(), dbUser.password)) {
        if (newPassword !== confirmNewPassword) { return res.json({ message: "Passwords Not Match", success: false }) };
        const hash = generateHash(newPassword);
        await changeUserPassword(userId, hash);
        res.clearCookie("token").json({ message: "Successfully changed password", success: true });
    } else {
        res.json({ message: "Invalid Password", success: false });
    }
}

async function sendUsername(req, res) {
    const { userId, IIfa } = req.body;
    const user = await getUser({ id: userId });
    if (user) {
        const { username } = user;
        res.json({ username, IIfa });
    }
}

module.exports = { sendUsername, changePassword, removePassword, addPassword, sendData };