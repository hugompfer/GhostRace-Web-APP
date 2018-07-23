const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'GhostRace'
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = db;