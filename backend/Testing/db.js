const mysql = require('mysql');

//Database
const db = mysql.createConnection({
    host: 'RSKs-MacBook-Pro.local',
    user: 'root',
    password: '123456',
    database: 'PROPERTYPRO',
});


db.connect(function (err) {
    if (err) {
        console.log('DB error');
        throw err;
        return false;
    }
    else {
        console.log("Succesfully connect to DB")
    }

});

module.exports = db;
