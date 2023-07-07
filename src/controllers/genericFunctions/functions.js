const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const fs = require("fs").promises;
require("dotenv").config();
const { dbData, createDb, get2faSecret } = require("../../database/database.js");

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
    return hash.slice(7);
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

async function createBackupFile() {
    const dbCopy = await dbData();
    for (let i = 0; i < dbCopy.users.length; i++) {
        if (i === 0) {
            if (dbCopy.users[ i ]) {
                fs.writeFile("users.csv", `${Object.keys(dbCopy.users[ i ])} \n`);
            }
            if (dbCopy.passwords[ i ]) {
                fs.writeFile("passwords.csv", `${Object.keys(dbCopy.passwords[ i ])} \n`)
            }
        }
        fs.appendFile("users.csv", `${dbCopy.users[ i ].person_id},${dbCopy.users[ i ].username},${dbCopy.users[ i ].password},${dbCopy.users[ i ].email},${dbCopy.users[ i ].IIfa},${dbCopy.users[ i ].secret} \n`);
        fs.appendFile("passwords.csv", `${dbCopy.passwords[ i ].user_id},${dbCopy.passwords[ i ].service},${dbCopy.passwords[ i ].service_password},${dbCopy.passwords[ i ].service_id} \n`)
    }
}

function deleteBackupFile() {
    fs.unlink("users.csv");
    fs.unlink("passwords.csv");
}

async function sendBackup() {

    await createBackupFile();
    const currentDate = new Date();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_KEY
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `SwordPass-Backup:${currentDate}`,
        attachments: [
            {
                filename: "users.csv",
                path: "./users.csv"
            },
            {
                filename: "passwords.csv",
                path: "./passwords.csv"
            },
            {
                filename: "database.db",
                path: "./database/database.db"
            }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            deleteBackupFile()
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

module.exports = { sendBackup, checkDb, sendEmail, generateHash, generatePassword, verifyCode };