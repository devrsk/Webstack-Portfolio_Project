class realtorRouter {

  // execute sql 
  async execSQL(db, sql) {
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  // execute sql get first record
  async findOne(db, sql) {
    const result = await this.execSQL(db, sql);
    return result.length > 0 ? result[0] : null;
  }

  /**
   * search realtor list by name
   *
   * @param {*} db
   * @param {string} [keyword='']
   * @return {*} 
   * @memberof realtorRouter
   */
  async searchByName(db, keyword = '') {
    const sql = `SELECT * FROM REALTOR t WHERE t.Fname ILIKE '%${keyword}%' OR t.Lname ILIKE '%${keyword}%'`;
    const list = await this.execSQL(db, sql);
    return { list };
  }

  /**
   * search realtor list by zipcode
   *
   * @param {*} db
   * @param {*} keyword
   * @return {*} 
   * @memberof realtorRouter
   */
  async searchByZip(db, keyword) {
    const sql = `SELECT * FROM REALTOR t WHERE t.zipcode ILIKE '%${keyword}%'`;
    const list = await this.execSQL(db, sql);
    return { list };
  }
}

module.exports = realtorRouter;