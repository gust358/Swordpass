const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

async function createDb() {

    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    })
    await db.exec("CREATE TABLE users (person_id INTEGER PRIMARY KEY,username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, IIfa INTEGER NOT NULL, secret TEXT NOT NULL)").catch((err) => { console.log(1) });
    await db.exec("CREATE TABLE passwords (user_id INTEGER NOT NULL,service TEXT NOT NULL, service_password TEXT NOT NULL,service_id INTEGER PRIMARY KEY, FOREIGN KEY(user_id) REFERENCES users (person_id) )").catch((err) => { console.log(2) });
    db.close()
    return;
}

async function insertUser(username, password, email) {
    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    })
    await db.run("INSERT INTO users(username,password,email, IIfa,secret) VALUES (?,?,?,?,?)", username, password, email, 0, "111111").catch(err => { console.log(err) });

    db.close();
    return;
};

async function insertService(user_id, service, password) {
    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    })

    await db.run("INSERT INTO passwords(user_id,service,service_password) values(?,?,?)", user_id, service, password).catch(err => { console.log(err) });
    db.close();
    return;
}

async function getUser({ email, username, id }) {

    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    })
    let type = null;

    if (email) { type = "email" };
    if (username) { type = "username" };
    if (id) { type = "person_id" }

    const user = await db.all(`SELECT * FROM users WHERE ${type} = ?`, email || username || id).then((rows) => { return rows }).catch(err => { return err })
    db.close();
    return user[ 0 ];
}

async function getUserPasswords(user_id) {

    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    })

    const passwords = await db.all("SELECT service,service_password,service_id FROM passwords WHERE user_id = ? ", user_id).then((rows) => { return rows }).catch(err => { console.log(err) });
    db.close();
    return passwords;

}

async function removeService(user_id, service_id) {
    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    });

    db.run("DELETE FROM passwords WHERE user_id = ? AND service_id = ?", user_id, service_id).catch(err => { console.log(err) });
    db.close();
    return;
}

async function changeUserPassword(user_id, new_password) {
    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    });

    db.run("UPDATE users SET password = ? WHERE person_id = ?", new_password, user_id).catch(err => { console.log(err) });

    db.close();
    return;
}

async function get2faSecret(user_id) {
    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    });

    const row = await db.all("SELECT secret FROM users WHERE person_id = ?", user_id).then((data) => { return data }).catch((err) => { console.log(err) })
    db.close();
    return row[ 0 ];
}

async function changeIIfaSecret(user_id, new_secret) {
    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    });

    db.run("UPDATE users SET secret = ? WHERE person_id = ?", new_secret, user_id).catch(err => { console.log(err) });

    db.close();
    return;
}

async function activeIIfa(user_id) {
    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    });

    db.run("UPDATE users SET IIfa = ? WHERE person_id = ?", 1, user_id);
    db.close();
}

module.exports = { changeIIfaSecret, activeIIfa, createDb, insertUser, insertService, getUser, getUserPasswords, removeService, changeUserPassword, get2faSecret };