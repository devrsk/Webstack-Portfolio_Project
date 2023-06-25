class realtorRouter {

    // execute sql 
    async execSQL(db, sql) {
      //console.log('sql :', sql);
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
  
    // execute sql get first redord
    async findOne(db, sql) {
      const list = await this.execSQL(db, sql);
      return list.length > 0 ? list[0] : null;
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
      //console.log("keyword", keyword)
      const sql = `select * from REALTOR t where t.Fname like '%${keyword}%' or t.Lname like '%${keyword}%' `;
      const list = await this.execSQL(db, sql);
      return { list }
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
      //console.log("keyword", keyword)
      const sql = `select * from REALTOR t where t.zipcode like '%${keyword}%' `;
      const list = await this.execSQL(db, sql);
     // console.log("list", list)
      return { list }
    }
  }
  
  
  
  module.exports = realtorRouter;