const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

class signupRouter {
  async execSQL(client, sql) {
    console.log('sql:', sql);
    return new Promise((resolve, reject) => {
      client.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  async findOne(client, sql) {
    const rows = await this.execSQL(client, sql);
    return rows.length > 0 ? rows[0] : null;
  }

  async register(dbPool, req, res) {
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 9);
    let email = req.body.emailAddress;
    let firstName = req.body.firstName || '';
    let lastName = req.body.lastName || '';
    let phone = req.body.phone || '';
    let zipcode = req.body.zipcode || '';
    let sales = req.body.sales || 0;
    let rent = req.body.rent || 0;
    let specialty = req.body.specialty || '';

    let client; // Declare the client variable

    try {
      client = await dbPool.connect(); // Acquire a client from the pool

      await client.query('BEGIN');

      let sql = `SELECT * FROM ACCOUNT WHERE username = '${username}'`;
      let userInfo = await this.findOne(client, sql);
      if (userInfo) {
        res.json({ success: false, msg: 'Username already exists, please try another one' });
        await client.query('ROLLBACK');
        return;
      }

      sql = `SELECT * FROM ACCOUNT WHERE Email ='${email}'`;
      userInfo = await this.findOne(client, sql);
      if (userInfo) {
        res.json({ success: false, msg: 'Email already exists, please try another one' });
        await client.query('ROLLBACK');
        return;
      }

      if (firstName) {
        sql = `SELECT * FROM REALTOR WHERE phone ='${phone}'`;
        userInfo = await this.findOne(client, sql);
        if (userInfo) {
          res.json({ success: false, msg: 'Phone already exists, please try another one' });
          await client.query('ROLLBACK');
          return;
        }
      }

      sql = `INSERT INTO ACCOUNT(username, Email, psswd, a_type, approved) VALUES ('${username}','${email}', '${password}', 'R','P') RETURNING id`;
      const { rows } = await client.query(sql);
      const insertId = rows[0].id;

      console.log('firstName:', firstName);
      if (firstName) {
        sql = `INSERT INTO REALTOR(U_ID, Fname, Lname, Email, phone, zipcode, sales, rent, specialty) VALUES
        (${insertId}, '${firstName}', '${lastName}', '${email}', '${phone}', '${zipcode}', '${sales}', '${rent}', '${specialty}') `;
        await this.execSQL(client, sql);
      }

      await client.query('COMMIT');
      res.json({ success: true, msg: 'register success' });
    } catch (ex) {
      await client.query('ROLLBACK');
      console.log('sql rollback');
      console.log(ex);
      res.json({ success: false, msg: 'Error, please try again' });
    } finally {
      if (client) {
        client.release(); // Release the client back to the pool
      }
    }
  }
}

module.exports = signupRouter;
