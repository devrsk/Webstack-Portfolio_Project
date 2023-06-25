const mysql = require('mysql');

//Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'db name',
});


db.connect(function(err) {
    if(err){
        console.log('DB error');
        throw err;
        return false;
    }
    else{
      console.log("Succesfully connect to DB")
    }
    
});

module.exports = db;
