const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const tokenVerifier = require('./tokenVerifier');

class loginRouter{
    // constructor(db, req, res){
    //     this.login(db, req, res);
    //     this.logout(db, req, res);
    //     //this.isLoggedIn(db, req, res);
    //     //this.privatePage(db, req, res);
         login(db, req, res) {
            let username = req.body.username;
            let password = req.body.password;
            
            let cols = [username];
            db.query('SELECT * FROM ACCOUNT WHERE username = ?', cols, (err, data, fields) => {

                if(err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: 'Invalid username, please try again'
                    })
                    return;
                }
                console.log(data);
                // Found 1 user with this username
                if(data && data.length === 1) {
                    console.log(data[0].ID);

                    if(data[0].approved !== 'Y'){
                        res.json({
                          success: false,
                          msg: 'Your account has not been approved by administrator.'
                      });
                      return;
                      }

                    bcrypt.compare(password, data[0].psswd, (bcryptErr, verified) => { // Error verfied always return false;
                       
                        //console.log("backend verfied : " + verified);

                        if(verified) {
                            const user = {
                                id: data[0].ID,
                                username: data[0].username,
                                email: data[0].Email,
                                role: data[0].a_type
                            }
                            //console.log(user);
                            var token = jwt.sign({user}, 'propertyprokey', {expiresIn: "1h"});
                                //console.log(token);
                                res.json({
                                    id: data[0].ID,
                                    username: data[0].username,
                                    email: data[0].Email,
                                    role: data[0].a_type,
                                    success: true,
                                    token: token
                                });
                           
                            //console.log(token);
                            return;
                        }
                         if(bcryptErr){
                            console.log(bcryptErr);
                        }

                        else {
                            res.json({
                                success: false,
                                msg: 'Invalid password'
                            })
                        }
                    });
                }

                else {
                    res.json({
                        success: false,
                        msg: 'please try again'
                    })
                }

            });

        }
        
   


    // logout(db, req, res) {
    //         if(req.session.userID) {

    //             req.session.destroy();
    //             res.json({
    //                 success: true
    //             })

    //             return true;
    //         } else {
    //             res.json({
    //                 success: false
    //             })
    //             return false;
    //         }
      
    // }


    

    // isLoggedIn(app, db) {
    //     app.post('/isLoggedIn', (req, res) => {
           
    //         if(req.session.userID) {
    //           console.log("backend isloggedin " + req.session.userID)
    //             let cols = [req.session.userID];
    //             db.query('SELECT * from account WHERE ID = ?', cols, (err, data, fields) => {

    //                 if(data && data.length === 1){

    //                     res.json({
    //                         success: true,
    //                         username: data[0].username
    //                     })

    //                     return true;
    //                 } else {
    //                     res.json({
    //                         success: false
    //                     })
    //                 }

    //             });
    //         } else {
    //             res.json({
    //                 success: false
    //             })
    //         }
    //     });

    // }
}
module.exports = loginRouter;
