const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class allUserRouter {
  allUser(db, req, res) {
    db.query('SELECT "ID", "username", "Email", "a_type", "approved" FROM "ACCOUNT"', (err, data, fields) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: ''
        });
        return;
      }
      res.json({
        success: true,
        dataset: data
      });
      return;
    });
  }

  updateUser(db, req, res) {
    let userID = req.body.id;
    let cols = ['Y', userID];
    db.query('UPDATE "ACCOUNT" SET "approved" = $1 WHERE "ID" = $2', cols, (err) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: ''
        });
        return;
      }
      db.query('SELECT "ID", "username", "Email", "a_type", "approved" FROM "ACCOUNT"', (err, data, fields) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            msg: ''
          });
          return;
        }
        console.log(data);
        res.json({
          success: true,
          dataset: data
        });
        return;
      });
    });
  }

  removeUser(db, req, res) {
    let userID = req.body.id;
    let cols = [userID];
    db.query('DELETE FROM "ACCOUNT" WHERE "ID" = $1', cols, (err) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: ''
        });
        return;
      }
      db.query('SELECT "ID", "username", "Email", "a_type", "approved" FROM "ACCOUNT"', (err, data, fields) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            msg: ''
          });
          return;
        }
        console.log(data);
        res.json({
          success: true,
          dataset: data
        });
        return;
      });
    });
  }
}

module.exports = allUserRouter;