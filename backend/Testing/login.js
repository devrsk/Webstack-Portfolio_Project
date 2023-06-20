const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class loginRouter {
  login(db, req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const query = 'SELECT * FROM ACCOUNT WHERE username = $1';
    const values = [username];

    db.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: 'Invalid username, please try again',
        });
        return;
      }

      const data = result.rows;

      // Found 1 user with this username
      if (data && data.length === 1) {
        if (data[0].approved !== 'Y') {
          res.json({
            success: false,
            msg: 'Your account has not been approved by the administrator.',
          });
          return;
        }

        bcrypt.compare(password, data[0].psswd, (bcryptErr, verified) => {
          if (verified) {
            const user = {
              id: data[0].id,
              username: data[0].username,
              email: data[0].email,
              role: data[0].a_type,
            };

            const token = jwt.sign({ user }, 'cmpe202key', { expiresIn: '1h' });

            res.json({
              id: data[0].id,
              username: data[0].username,
              email: data[0].email,
              role: data[0].a_type,
              success: true,
              token: token,
            });
          } else if (bcryptErr) {
            console.log(bcryptErr);
          } else {
            res.json({
              success: false,
              msg: 'Invalid password',
            });
          }
        });
      } else {
        res.json({
          success: false,
          msg: 'Please try again',
        });
      }
    });
  }
}

module.exports = loginRouter;
