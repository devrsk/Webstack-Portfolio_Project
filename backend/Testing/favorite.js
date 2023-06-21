const fs = require('fs');
const path = require('path');
const sendEmail = require("../Testing/sendEmail");

class FavoriteRouter {
  async execSQL(db, sql) {
    return new Promise((resolve, reject) => {
      db.query(sql, (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async findOne(db, sql) {
    const result = await this.execSQL(db, sql);
    return result ? result[0] : null;
  }

  async beginTran(db) {
    return new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  async homeList(db, req) {
    const { id } = req.query;
    if (!id) {
      throw Error('user id needs to be filled');
    }
    let sql = `SELECT fh.*, a.username, a.Email, a.a_type, a.approved FROM favorite_home fh 
    LEFT JOIN ACCOUNT a ON fh.U_ID = a.ID WHERE fh.U_ID = ${id}`;

    const result = await this.execSQL(db, sql);

    return { list: result ? [result] : [] };
  }

  async homeAdd(db, req) {
    const { U_ID, home_type, properity_id } = req.body;
    if (!U_ID) {
      throw Error('user id needs to be filled');
    }
    if (!home_type) {
      throw Error('home type needs to be filled');
    }
    if (!properity_id) {
      throw Error('property id needs to be filled');
    }
    let sql = `INSERT INTO favorite_home(U_ID, home_type, properity_id) VALUES (${U_ID}, '${home_type}', ${properity_id})`;
    await this.execSQL(db, sql);
    return { msg: 'add success' };
  }

  async homeDelete(db, req, res) {
    const { U_ID, home_type, properity_id } = req.body;
    if (!U_ID) {
      throw Error('user id needs to be filled');
    }
    if (!home_type) {
      throw Error('home type needs to be filled');
    }
    if (!properity_id) {
      throw Error('property id needs to be filled');
    }
    let sql = `DELETE FROM favorite_home WHERE U_ID = ${U_ID} AND home_type = '${home_type}' AND properity_id = ${properity_id}`;
    await this.execSQL(db, sql);
    return { msg: 'delete success' };
  }

  async searchAdd(db, req) {
    const { U_ID, search_type, min_price = 0, max_price = 0, bedroom = 0, bathroom = 0, home_type = '', year_built = '', flooring = '', house_size = '', parking = 0 } = req.body;
    if (!U_ID) {
      throw Error('user id needs to be filled');
    }
    if (!home_type) {
      throw Error('home type needs to be filled');
    }
    if (!search_type) {
      throw Error('search type needs to be filled');
    }
    let sql = `INSERT INTO favorite_search(U_ID, search_type, min_price, max_price, bedroom, bathroom, home_type, year_built, flooring, house_size, parking) VALUES (${U_ID}, '${search_type}', ${min_price}, ${max_price}, '${bedroom}', '${bathroom}', '${home_type}', '${year_built}', '${flooring}', '${house_size}', ${parking})`;
    await this.execSQL(db, sql);
    return { msg: 'add success' };
  }

  async searchDelete(db, req) {
    const { ID } = req.query;
    if (!ID) {
      throw Error('id needs to be filled');
    }
    let sql = `DELETE FROM favorite_search WHERE ID = ${ID}`;
    await this.execSQL(db, sql);
    return { msg: 'delete success' };
  }

  async searchList(db, req) {
    let sql = `SELECT * FROM favorite_search t`;
    const result = await this.execSQL(db, sql);
    return { list: result ? [result] : [] };
  }

  async searchDetail(db, req) {
    const { id } = req.params;
    if (!id) {
      throw Error('id needs to be filled');
    }
    let sql = `SELECT * FROM favorite_search t WHERE t.id = ${id}`;
    const detail = await this.findOne(db, sql);
    if (!detail) {
      throw Error('detail does not exist');
    }
    return detail;
  }

  async getMySearchHistory(db, req) {
    const { id } = req.query;
    if (!id) {
      throw Error('id needs to be filled');
    }
    const sql = `SELECT * FROM favorite_search t WHERE t.u_id = ${id}`;
    const result = await this.execSQL(db, sql);
    return { list: result ? [result] : [] };
  }
}

module.exports = FavoriteRouter;