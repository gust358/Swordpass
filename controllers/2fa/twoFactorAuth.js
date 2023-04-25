const { get2faSecret, activeIIfa, getUser, changeIIfaSecret } = require("../../database/database.js");
const { sendEmail, verifyCode } = require("../genericFunctions/functions.js");
const twofa = require("node-2fa");
const jwt = require("jsonwebtoken");

async function IIfaAuth(req, res) {
    const { IIfaCode, IIfa, userId } = req.body;
    const valid = await verifyCode(userId, IIfaCode);

    if (valid === true) {
        if (IIfa === 0) {
            await activeIIfa(userId);
            res.clearCookie("token");
            res.json({ success: true, message: "Two Factor Auth successufully activated" })
        }
        if (IIfa === 1) {
            const token = jwt.sign({ userId, IIfa, auth: true, IIfaAuth: true }, process.env.SECRET1, { expiresIn: 300 });
            res.cookie("token", token, { path: "/" });
            res.clearCookie("authToken");
            res.json({ success: true });
        }
    } else {
        res.json({ success: false, message: "Invalid Code" });
    }

}

async function sendIIfaToken(req, res) {
    const { userId } = req.body;
    if (userId) {
        const user = await getUser({ id: userId });
        const code = (Math.floor(Math.random() * 10000000)) % 1000000;
        await changeIIfaSecret(userId, code);
        sendEmail(user.email, code);
        res.json({ success: true, message: "Token successfully send" });
    } else {
        res.json({ success: false, message: "Invalid user" });
    }
}

module.exports = { IIfaAuth, sendIIfaToken };