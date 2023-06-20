class realtorRouter {
  async execSQL(db, sql) {
    try {
      const result = await db.query(sql);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  async findOne(db, sql) {
    const list = await this.execSQL(db, sql);
    return list.length > 0 ? list[0] : null;
  }

  async searchByName(db, keyword = '') {
    const sql = `SELECT * FROM REALTOR t WHERE t.Fname ILIKE '%${keyword}%' OR t.Lname ILIKE '%${keyword}%'`;
    const list = await this.execSQL(db, sql);
    return { list };
  }

  async searchByZip(db, keyword) {
    const sql = `SELECT * FROM REALTOR t WHERE t.zipcode ILIKE '%${keyword}%'`;
    const list = await this.execSQL(db, sql);
    return { list };
  }
}

module.exports = realtorRouter;