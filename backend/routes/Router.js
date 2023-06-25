const bcrypt = require('bcrypt');

class Router{
    constructor(app, db){
        this.login(app, db);
        // this.logout(app, db);
        // this.isLoggedIn(app, db);
        this.register(app, db);
        this.checkUserName(app, db);
        this.checkEmail(app, db);
    }

    login(app, db) {
        app.post('/login', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;

            let cols = [username];
            db.query('SELECT * FROM account WHERE username = ?', cols, (err, data, fields) => {

                if(err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: 'Database error, plese try again'
                    })
                    return;
                }

                // Found 1 user with this username
                if(data && data.length === 1) {
                  if(data[0].approved === 'P'){
                    res.json({
                      success: false,
                      msg: 'Your account has not been approved by administrator.'
                  });
                  return;
                  }

                    bcrypt.compare(password, data[0].psswd, (bcryptErr, verified) => { // Error verfied always return false;
                       
                    console.log("backend verfied : " + verified);

                        if(verified) {
                          const user = {
                            id: data[0].ID,
                            username: data[0].username,
                            email: data[0].email,
                            role: data[0].a_type
                          }

                        jwt.sign({user: user}, 'propertyprokey',{expiresIN: '2h'}, (err, token) => {
                            res.json({
                                success: true,
                                token: token
                            })
                        });

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
                        msg: 'User not found, please try again'
                    })
                }

            });

        });
    }

    // logout(app, db) {

    //     app.post('/logout', (req, res) => {

    //       const bearerHeader = req.headers['authorization'];
    //     //Check if bearer is undefined
    //     if(typeof bearerHeader !== 'undefined'){
    //         //split at the space
    //         const bearer = bearerHeader.split(' ');
    //         //get token from array bearer
    //         const bearerToken = bearer[1];
    //         //set the token
    //         req.token = bearerToken;
    //         // call next middleware

        
        
    //       } else {
    //         // Forbidden
    //         res.sendStatus(403);
    //     }

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
    //     })

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
//weichao
    register (app, db) {
      app.post('/register', (req, res) => {


        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 9);//req.body.password;
        let email = req.body.emailAddress;
       
        db.query(
          'insert into account(username,Email,psswd,a_type,approved) values (?, ?, ?, ?,?)',
          [username, email, password, 'R','P'],
          (err) => {
            if(err) {
                //console.log(err);
                return res.send({
                    success: false,
                    msg: 'register failed',
                    err,
                }).end();
            }

            res.send({
              success: true,
              msg: 'register success'
            }).end();
          }
        )

      })
    }

    checkUserName (app, db) {
      app.post('/is-username-usable', (req, res) => {
        const { username } = req.body;

        db.query(
          'select * from account where username= values(?)',
          [username],
          (err, data) => {
            if(err) {
              return res.send({
                success: false,
                msg: 'database query error! Please contact backend developer',
                err,
              }).end();
            }

            res.send({
              useAble: data.length === 0
            }).end();
          }
        )
      })
    }

    checkEmail (app, db) {
      app.post('/is-email-usable', (req, res) => {
        const { email } = req.body;

        db.query(
          'select * from account where Email =values(?)',
          [email],
          (err, data) => {
            if(err) {
              return res.send({
                success: false,
                msg: 'database query error! Please contact backend developer',
                err,
              }).end();
            }

            res.send({
              useAble: data.length === 0
            }).end();
          }
        )
      })
    }
}

module.exports = Router;
