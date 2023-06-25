const express = require("express");
const bodyParser = require("body-parser");
const login = require('./login');
const db = require('./db');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PropertyPro" });
});

app.post("/login", function(req, res) {
    console.log("Req Body : ", req.body);
    var temp = new login();
    temp.login(db, req, res);
  });

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

// app.post('/privatePage', verifyToken, (req, res)=> {
//     jwt.verify(req.token, 'propertyprokey', (err, authData) => {
//         if(err){
//             res.sendStatus(403);
//         } else{
//             res.json({
//                 message: 'Welcome to your private page',
//                 authData
//             });
//         }
//     });
    
// });


// // Format of token
//     // Authorization: Bearer <access_token>
//     // Verify Token
//     verifyToken(req, res, next) {
//         //Get auth header value
//         const bearerHeader = req.headers['authorization'];
//         //Check if bearer is undefined
//         if(typeof bearerHeader !== 'undefined'){
//             //split at the space
//             const bearer = bearerHeader.split(' ');
//             //get token from array bearer
//             const bearerToken = bearer[1];
//             //set the token
//             req.token = bearerToken;
//             // call next middleware
//             next();
//         } else {
//             // Forbidden
//             res.sendStatus(403);
//         }
//     }