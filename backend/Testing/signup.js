const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class signupRouter {

    async execSQL(db, sql) {
        console.log('sql :', sql);
        return new Promise((resolve, reject) => {
            db.query(sql, (err, rows, fields) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows);
                }
            })
        })
    }

    async findOne(db, sql) {
        const list = await this.execSQL(db, sql);
        return list.length > 0 ? list[0] : null;
    }
    async beginTran(db) {
        return new Promise((resolve, reject) => {
            db.beginTransaction((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    }
    async register(db, req, res) {
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, 9);//req.body.password;
        let email = req.body.emailAddress;
        let firstName = req.body.firstName || '';
        let lastName = req.body.lastName || '';
        let phone = req.body.phone || '';
        let zipcode = req.body.zipcode || '';
        let sales = req.body.sales || 0;
        let rent = req.body.rent || 0;
        let specialty = req.body.specialty || '';
        let sql = `SELECT * FROM ACCOUNT WHERE username = '${username}'`;

        try {
            let userInfo = await this.findOne(db, sql);
            if (userInfo) {                //                         judge username is exists
                res.json({ success: false, msg: 'Username already exists, please try another one' });
                return;
            }
            sql = `SELECT * FROM ACCOUNT WHERE Email ='${email}'`;
            userInfo = await this.findOne(db, sql);
            if (userInfo) {                //                         judge email is exists;
                res.json({ success: false, msg: 'Email already exists, please try another one' });
                return;
            }
            if (firstName) {
                sql = `SELECT * FROM REALTOR WHERE phone ='${phone}'`;
                userInfo = await this.findOne(db, sql);
                if (userInfo) {                //                         judge phone is exists;
                    res.json({ success: false, msg: 'Phone already exists, please try another one' });
                    return;
                }
            }

            await this.beginTran(db);
            //                                                        save user infomation to account
            sql = `insert into ACCOUNT(username,Email,psswd,a_type,approved) values ('${username}','${email}', '${password}', 'R','P')`;
            const data = await this.execSQL(db, sql);
            const { insertId } = data;
            console.log('firstName:', firstName);
            if (firstName) {
                //                                                    save user other infomation to realtor
                sql = `insert into REALTOR(U_ID, Fname, Lname, Email, phone, zipcode, sales, rent, specialty) values
            (${insertId}, '${firstName}', '${lastName}', '${email}', '${phone}', '${zipcode}', '${sales}', '${rent}', '${specialty}') `;
                await this.execSQL(db, sql); //                           s
            }
            db.commit();//                                            commit transaction
            res.json({ success: true, msg: 'register success' })
        } catch (ex) {
            db.rollback();//                                          rollback transaction
            console.log('sql rollback')
            console.log(ex);
            res.json({ success: false, msg: 'Error, please try again' })
        }
    }
}
module.exports = signupRouter;