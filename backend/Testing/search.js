const jwt = require('jsonwebtoken');

class searchRouter {
  get TableName() {
    const sql = `
    (
      select 'r' search_type, R_ID,Owner_ID,Realtor_ID,property_type,apt_num,'' street_num,street,city,state,zip, '' sale_status, 0 price,   available_date,     rate,   lease_term,  security_deposit, bedroom,bathroom, '' living,    parking,flooring,0 area, '' size_sqft,   year_built,    ammenities,description, pic_dir from PROPERTYPRO.FOR_RENT
      union all
      select 'b' search_type, S_ID,Owner_ID,Realtor_ID,property_type,apt_num,'' street_num,street,city,state,zip, sale_status,      price,  '' available_date, 0 rate, 0 lease_term,0 security_deposit, bedroom,bathroom,'' livingroom, parking,flooring,  area, 0 size_sqft,    year_built, '' ammenities,description, pic_dir from PROPERTYPRO.FOR_SALE
    )
    `;
    return sql;
  }

  async execSQL(db, sql) {
    console.log(`ExecuteSQL: [ ${sql} ]`);
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
    const list = await this.execSQL(db, sql);
    return list.length > 0 ? list[0] : null;
  }

  /**
   * 保存搜索记录到数据库
   *
   * @param {*} db
   * @param {*} uid          用户ID  url上传
   * @param {*} token        token   header上传
   * @param {*} search_type  
   * @param {*} min_price    
   * @param {*} max_price    
   * @param {*} bedroom      
   * @param {*} bathroom     
   * @param {*} home_type    
   * @param {*} zip_code     
   * @param {*} year_built   
   * @param {*} flooring     
   * @param {*} house_size   
   * @param {*} parking      
   * @returns
   * @memberof searchRouter
   */
  async saveSearchKeyword(db, uid, token, search_type, min_price, max_price, bedroom, bathroom, home_type, zip_code, year_built, flooring, house_size, parking) {
    if (!token && !uid ) {
      return;
    }

    let user_id;
    if(uid){
      user_id  = uid;
    }else{
        const [isExpired, tokenInfo] = await new Promise((resolve, reject) => {
          jwt.verify(token, 'propertyprokey', (err, decoded) => {
            if (err) {
            resolve([false, null]);
          } else {
            resolve([true, decoded.user]);
          }
        });
      });
      
      if (!isExpired) {
        console.log('token expired')
        return;
      }
      const {id} = tokenInfo;
      user_id = id;
    }
   
    // U_ID, search_type
    const keys = ['U_ID', 'search_type'];
    const values = [user_id, `'${search_type || ''}'`];
    console.log(min_price)
    if (min_price && min_price != 'null')  {
      keys.push('min_price');
      values.push(min_price);
      console.log("here min price")
    }
    if (max_price && max_price != 'null')  {
      keys.push('max_price');
      values.push(max_price);
      console.log(values)
    }
    if (bedroom && bedroom != 'null')  {
      keys.push('bedroom');
      values.push(bedroom);
    }
    if (bathroom && bathroom != 'null')  {
      keys.push('bathroom');
      values.push(bathroom);
    }
    if (home_type && home_type != 'null')  {
      keys.push('home_type');
      values.push(`'${home_type}'`);
    }
    if (zip_code && zip_code != 'null')  {
      keys.push('zip_code');
      values.push(zip_code);
    }
    if (year_built && year_built != 'null')  {
      keys.push('year_built');
      values.push(year_built);
    }
    if (flooring && flooring != 'null')  {
      keys.push('flooring');
      values.push(`'${flooring}'`);
    }
    if (house_size && house_size != 'null')  {
      keys.push('house_size');
      values.push(house_size);
    }
    console.log('parking:', parking);
    if (parking) {
      keys.push(' parking');
      values.push(parking);
    }
    // console.log('keys:',keys);  
    // console.log('values:',values); 
    let sql = `insert into favorite_search (${keys.join(',')})values(${values.join(',')})`;

 
    console.log('save success.....');
    try {
      await this.execSQL(db, sql);
    } catch (ex) {
      console.log(ex);
    } 
  }

  /**
   * keyword search
   *
   * @param {*} db
   * @param {*} req
   * @returns
   * @memberof searchRouter
   */
  async begin(db, req) {
    // console.log('----------', req.headers.token);
    const token = req.headers.token;
    const {
      keyword = '',
      search_type,
      zip_code,
      min_price,  
      max_price,  
      bedroom,
      bathroom,
      home_type,
      year_built,
      flooring,
      house_size,
      minSize,
      minRate,
      maxRate,
      parking,
      uid
    } = Object.assign({},req.query, req.body);
   
    this.saveSearchKeyword(db, uid, token, search_type, min_price || minRate, max_price||maxRate, bedroom, bathroom, home_type, zip_code, year_built, flooring, house_size, parking);

    let where = `(t.street like '%${keyword}%' or t.city like '%${keyword}%' )`;
    // price 条件过滤
    if (min_price && min_price != 'null' ) {
      where += ` and t.price>= ${min_price}`;
    }
    if (max_price && max_price != 'null' ) {
      where += ` and t.price <= ${max_price}`;
    }
    // rate 条件过滤
    if(maxRate && maxRate != 'null'){
      where += ` and t.rate <= ${maxRate}`;
    }
    if(minRate && minRate != 'null'){
      where += ` and t.rate >= ${maxRate}`;
    }

    if (bedroom && bedroom != 'null' ) {
      where += ` and t.bedroom <= ${bedroom}`;
    }
    if (bathroom && bathroom != 'null' ) {
      where += ` and t.bathroom <= ${bathroom}`;
    }
    if (zip_code && zip_code != 'null' ) {
      where += ` and t.zip like '%${zip_code}%'`;
    }
    if (flooring && flooring != 'null' ) {
      where += ` and t.flooring like '%${flooring}%'`;
    }
    if (year_built && year_built != 'null' ) {
      where += ` and t.year_built like '%${year_built}%' `;
    }
    if (house_size && house_size != 'null' ) {
      where += ` and t.area <= ${house_size}`;
    }
    if(minSize && minSize != 'null'){
      where += ` and t.area >= ${minSize}`;
    }
    if (parking && parking != 'null') {
      where += ` and t.parking = ${parking}`;
    }

    console.log('where:', where);

    let tmpView = `select * from ${this.TableName} tt `;
    if (search_type) {
      tmpView += ` where tt.search_type = '${search_type}'`;
    }

    let sql = `select * from (${tmpView})t where ${where} `;
    const list = await this.execSQL(db, sql);
    return {list};
  }
}

module.exports = searchRouter;