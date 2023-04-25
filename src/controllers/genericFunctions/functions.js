const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const fs = require("fs").promises;
require("dotenv").config();
const { createDb, get2faSecret } = require("../../database/database.js");

function generateHash(password) {
    const saltRound = Math.floor(Math.random() * 10);
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function generatePassword() {
    const password = Math.random() * 10000000;
    const saltRound = Math.floor(Math.random() * 10);
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(password.toString(), salt);
    return hash;
}

function sendEmail(dest_email, code) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_KEY
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: dest_email,
        subject: 'Sword Pass Manager',
        text: `This is your code : ${code}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

async function checkDb() {

    const archives = await fs.readdir("./database");
    let res = 0;

    for (let k in archives) {
        if (archives[ k ] === 'database.db') {
            res = 1;
        }
    }
    if (res === 0) {
        await createDb();
        console.log("Archive database.db created");
    } else {
        console.log("Archive database.db exists ");
    }

}

async function verifyCode(userId, code) {

    const { secret } = await get2faSecret(userId);
    if (secret === code) {
        return true
    } else {
        return false
    }

}

module.exports = { checkDb, sendEmail, generateHash, generatePassword, verifyCode };