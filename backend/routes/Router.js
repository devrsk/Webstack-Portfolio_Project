const bcrypt = require('bcrypt');

class Router {
  constructor(app, db) {
    this.login(app, db);
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

        if (err) {
          console.log(err);
          res.json({
            success: false,
            msg: 'Database error, plese try again'
          })
          return;
        }

        // Found 1 user with this username
        if (data && data.length === 1) {
          if (data[0].approved === 'P') {
            res.json({
              success: false,
              msg: 'Your account has not been approved by administrator.'
            });
            return;
          }

          bcrypt.compare(password, data[0].psswd, (bcryptErr, verified) => { // Error verfied always return false;

            console.log("backend verfied : " + verified);

            if (verified) {
              const user = {
                id: data[0].ID,
                username: data[0].username,
                email: data[0].email,
                role: data[0].a_type
              }

              jwt.sign({ user: user }, 'propertyprokey', { expiresIN: '2h' }, (err, token) => {
                res.json({
                  success: true,
                  token: token
                })
              });

              return;
            }
            if (bcryptErr) {
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


  register(app, db) {
    app.post('/register', (req, res) => {


      let username = req.body.username;
      let password = bcrypt.hashSync(req.body.password, 9);//req.body.password;
      let email = req.body.emailAddress;

      db.query(
        'insert into account(username,Email,psswd,a_type,approved) values (?, ?, ?, ?,?)',
        [username, email, password, 'R', 'P'],
        (err) => {
          if (err) {
            //console.log(err);
            return res.send({
              success: false,
              msg: 'register failed',
              err,
            }).end();
          }

          res.send({
            success: true,
            msg: 'Thank you for signing up. Your application is pending the approval of the administrator. In the meantime, you can continue looking at some houses. Happy Browsing'
          }).end();
        }
      )

    })
  }

  checkUserName(app, db) {
    app.post('/is-username-usable', (req, res) => {
      const { username } = req.body;

      db.query(
        'select * from account where username= values(?)',
        [username],
        (err, data) => {
          if (err) {
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

  checkEmail(app, db) {
    app.post('/is-email-usable', (req, res) => {
      const { email } = req.body;

      db.query(
        'select * from account where Email =values(?)',
        [email],
        (err, data) => {
          if (err) {
            return res.send({
              success: false,
              msg: 'database query error! Please contact administrator',
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
