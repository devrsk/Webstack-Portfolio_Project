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

      db.query('SELECT * FROM account WHERE username = $1', [username], (err, data) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            msg: 'Database error, please try again'
          });
          return;
        }

        if (data && data.length === 1) {
          if (data[0].approved === 'P') {
            res.json({
              success: false,
              msg: 'Your account has not been approved by the administrator.'
            });
            return;
          }

          bcrypt.compare(password, data[0].psswd, (bcryptErr, verified) => {
            console.log("backend verified: " + verified);

            if (verified) {
              const user = {
                id: data[0].ID,
                username: data[0].username,
                email: data[0].email,
                role: data[0].a_type
              };

              jwt.sign({ user: user }, 'cmpe202key', { expiresIn: '2h' }, (err, token) => {
                res.json({
                  success: true,
                  token: token
                });
              });

              return;
            }

            if (bcryptErr) {
              console.log(bcryptErr);
            } else {
              res.json({
                success: false,
                msg: 'Invalid password'
              });
            }
          });
        } else {
          res.json({
            success: false,
            msg: 'User not found, please try again'
          });
        }
      });
    });
  }

  register(app, db) {
    app.post('/register', (req, res) => {
      let username = req.body.username;
      let password = bcrypt.hashSync(req.body.password, 9);
      let email = req.body.emailAddress;

      db.query(
        'INSERT INTO account (username, email, psswd, a_type, approved) VALUES ($1, $2, $3, $4, $5)',
        [username, email, password, 'R', 'P'],
        (err) => {
          if (err) {
            return res.send({
              success: false,
              msg: 'Register failed',
              err,
            }).end();
          }

          res.send({
            success: true,
            msg: 'Register success'
          }).end();
        }
      );
    });
  }

  checkUserName(app, db) {
    app.post('/is-username-usable', (req, res) => {
      const { username } = req.body;

      db.query(
        'SELECT * FROM account WHERE username = $1',
        [username],
        (err, data) => {
          if (err) {
            return res.send({
              success: false,
              msg: 'Database query error! Please contact the backend developer',
              err,
            }).end();
          }

          res.send({
            useAble: data.length === 0
          }).end();
        }
      );
    });
  }

  checkEmail(app, db) {
    app.post('/is-email-usable', (req, res) => {
      const { email } = req.body;

      db.query(
        'SELECT * FROM account WHERE email = $1',
        [email],
        (err, data) => {
          if (err) {
            return res.send({
              success: false,
              msg: 'Database query error! Please contact the backend developer',
              err,
            }).end();
          }

          res.send({
            useAble: data.length === 0
          }).end();
        }
      );
    });
  }
}

module.exports = Router;
