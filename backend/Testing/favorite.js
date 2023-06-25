class FavoriteRouter {

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
  
  
    /**
     * get favorite home list by uid
     *
     * @param {*} db
     * @param {*} req
     * @return {*} 
     * @memberof FavoriteRouter
     */
    async homeList(db, req) {
      //console.log("req.query", req.query)
      const { id } = req.query;
      if (!id) {
        throw Error('user id need to be filled');
       }
      let sql = `select fh.*,a.username,a.Email,a.a_type,a.approved from favorite_home fh 
      left join ACCOUNT a on fh.U_ID = a.ID where fh.U_ID = ${id}`
  
      const list = await this.execSQL(db, sql);
  
      return { list }
    }
  
    /**
     * save data to favorite_home
     *
     * @param {*} db
     * @param {*} req
     * @returns
     * @memberof FavoriteRouter
     */
    async homeAdd(db, req) {
      const { U_ID, home_type, properity_id } = req.body;
      if (!U_ID) {
        throw Error('user id need to be filled');
      }
      if (!home_type) {
        throw Error('home type need to be filled');
      }
      if (!properity_id) {
        throw Error('properity id need to be filled');
      }
      let sql = `insert into favorite_home(U_ID, home_type, properity_id)values(${U_ID}, '${home_type}', ${properity_id})`;
      await this.execSQL(db, sql);
      return { msg: 'add success' }
    }
  
    /**
     * delete record from favorite_home
     *
     * @param {*} db
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof FavoriteRouter
     */
    async homeDelete(db, req, res) {
      const { U_ID, home_type, properity_id } = req.body;
      if (!U_ID) {
        throw Error('user id need to be filled');
      }
      if (!home_type) {
        throw Error('home type need to be filled');
      }
      if (!properity_id) {
        throw Error('properity id need to be filled');
      }
      let sql = `delete from favorite_home where  U_ID = ${U_ID} and home_type = '${home_type}' and properity_id = ${properity_id}`
      await this.execSQL(db, sql);
      return { msg: 'delete success' }
    }
  
  
    /**
     * save data to favorite_search
     *
     * @param {*} db
     * @param {*} req
     * @returns
     * @memberof FavoriteRouter
     */
    async searchAdd(db, req) {
      const { U_ID, search_type, min_price = 0, max_price = 0, bedroom = 0, bathroom = 0, home_type = '', year_built = '', flooring='', house_size='', parking=0 } = req.body;
      if (!U_ID) {
        throw Error('user id need to be filled');
      }
      if (!home_type) {
        throw Error('home type need to be filled');
      }
      if (!search_type) {
        throw Error('search type need to be filled');
      }
      let sql = `insert favorite_search(U_ID, search_type, min_price, max_price, bedroom, bathroom, home_type, year_built, flooring, house_size, parking)values(
        ${U_ID}, '${search_type}', ${min_price}, ${max_price}, '${bedroom}', '${bathroom}', '${home_type}', ${year_built}, ${flooring}, ${house_size}, ${parking}'
      )`
      await this.execSQL(db, sql);
      return { msg: 'add success' }
    }
  
    /**
     * delete record from favorite_search;
     *
     * @param {*} db
     * @param {*} req
     * @returns
     * @memberof FavoriteRouter
     */
    async searchDelete(db, req) {
      console.log("query", req.query);
      const { ID } = req.query;
      console.log("ID", ID);
      if (ID=='' || ID == undefined) {
        throw Error('id need to be filled');
      }
      let sql = `delete from favorite_search where ID = ${ID}`;
      await this.execSQL(db, sql);
      return { msg: 'delete success' }
    }
  
    /**
     * list
     *
     * @param {*} db
     * @param {*} req
     * @returns
     * @memberof FavoriteRouter
     */
    async searchList(db, req) {
    //   const { page = 1, size = 10 } = req;
    //   const _page = Number(page) || 1;
    //   const _size = Number(size) || 10
      let sql = `select * from favorite_search t`;
      const list = await this.execSQL(db, sql);
      sql = `select count(1) total from favorite_search`;
      const totalInfo = await this.findOne(db, sql);
  
    //  return { page, size, list, total: totalInfo.total }
    return { list }
    }
  
    /**
     * get detail by id
     *
     * @param {*} db
     * @param {*} req
     * @returns
     * @memberof FavoriteRouter
     */
    async searchDetail(db, req) {
      const { id } = req.params;
      if (!id) {
        throw Error('id need to be filled');
      }
      let sql = `select * from favorite_search t where t.id = ${id}`;
      const detail = await this.findOne(db, sql);
      if (!detail) {
        throw Error('detail not exists');
      }
      return detail;
    }

    /**
   * 获取用户的搜索历史记录
   *
   * @param {*} db
   * @param {*} req
   * @returns
   * @memberof FavoriteRouter
   */
  async getMySearchHistory(db, req) {
    const {id} = req.query;
    if (!id) {
      throw Error('id need to be filled');
    }
    const sql = `select * from favorite_search t where t.u_id = ${id}`;
    const list = await this.execSQL(db, sql);
    return {list};
  }
}
  
  
  
  
  module.exports = FavoriteRouter;