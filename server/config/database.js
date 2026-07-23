const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../../database/notes.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log("Database Connection Failed:", err.message);
    } else {
        console.log("Connected to SQLite Database");

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                title TEXT NOT NULL,
                content TEXT,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `);
    }
});

module.exports = db;