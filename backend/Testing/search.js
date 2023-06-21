const jwt = require('jsonwebtoken');

class searchRouter {
  get TableName() {
    const sql = `
    (
      select 'r' as search_type, R_ID, Owner_ID, Realtor_ID, property_type, apt_num, '' as street_num, street, city, state, zip, '' as sale_status, 0 as price, available_date, rate, lease_term, security_deposit, bedroom, bathroom, '' as living, parking, flooring, 0 as area, '' as size_sqft, year_built, ammenities, description, pic_dir from propertypro.FOR_RENT
      union all
      select 'b' as search_type, S_ID, Owner_ID, Realtor_ID, property_type, apt_num, '' as street_num, street, city, state, zip, sale_status, price, '' as available_date, 0 as rate, 0 as lease_term, 0 as security_deposit, bedroom, bathroom, '' as livingroom, parking, flooring, area, 0 as size_sqft, year_built, '' as ammenities, description, pic_dir from propertypro.FOR_SALE
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

  async saveSearchKeyword(db, uid, token, search_type, min_price, max_price, bedroom, bathroom, home_type, zip_code, year_built, flooring, house_size, parking) {
    if (!token && !uid) {
      return;
    }

    let user_id;
    if (uid) {
      user_id = uid;
    } else {
      const [isExpired, tokenInfo] = await new Promise((resolve, reject) => {
        jwt.verify(token, 'cmpe202key', (err, decoded) => {
          if (err) {
            resolve([false, null]);
          } else {
            resolve([true, decoded.user]);
          }
        });
      });

      if (!isExpired) {
        console.log('token expired');
        return;
      }
      const { id } = tokenInfo;
      user_id = id;
    }

    const keys = ['U_ID', 'search_type'];
    const values = [user_id, `'${search_type || ''}'`];

    if (min_price && min_price != 'null') {
      keys.push('min_price');
      values.push(min_price);
    }
    if (max_price && max_price != 'null') {
      keys.push('max_price');
      values.push(max_price);
    }
    if (bedroom && bedroom != 'null') {
      keys.push('bedroom');
      values.push(bedroom);
    }
    if (bathroom && bathroom != 'null') {
      keys.push('bathroom');
      values.push(bathroom);
    }
    if (home_type && home_type != 'null') {
      keys.push('home_type');
      values.push(`'${home_type}'`);
    }
    if (zip_code && zip_code != 'null') {
      keys.push('zip_code');
      values.push(zip_code);
    }
    if (year_built && year_built != 'null') {
      keys.push('year_built');
      values.push(year_built);
    }
    if (flooring && flooring != 'null') {
      keys.push('flooring');
      values.push(`'${flooring}'`);
    }
    if (house_size && house_size != 'null') {
      keys.push('house_size');
      values.push(house_size);
    }
    if (parking) {
      keys.push('parking');
      values.push(parking);
    }

    let sql = `insert into propertypro.favorite_search (${keys.join(',')}) values (${values.join(',')})`;

    console.log('save success.....');
    try {
      await this.execSQL(db, sql);
    } catch (ex) {
      console.log(ex);
    }
  }

  async begin(db, req) {
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
    } = Object.assign({}, req.query, req.body);

    this.saveSearchKeyword(db, uid, token, search_type, min_price || minRate, max_price || maxRate, bedroom, bathroom, home_type, zip_code, year_built, flooring, house_size, parking);

    let where = `(t.street like '%${keyword}%' or t.city like '%${keyword}%' )`;

    if (min_price && min_price != 'null') {
      where += ` and t.price >= ${min_price}`;
    }
    if (max_price && max_price != 'null') {
      where += ` and t.price <= ${max_price}`;
    }
    if (maxRate && maxRate != 'null') {
      where += ` and t.rate <= ${maxRate}`;
    }
    if (minRate && minRate != 'null') {
      where += ` and t.rate >= ${minRate}`;
    }
    if (bedroom && bedroom != 'null') {
      where += ` and t.bedroom <= ${bedroom}`;
    }
    if (bathroom && bathroom != 'null') {
      where += ` and t.bathroom <= ${bathroom}`;
    }
    if (zip_code && zip_code != 'null') {
      where += ` and t.zip like '%${zip_code}%'`;
    }
    if (flooring && flooring != 'null') {
      where += ` and t.flooring like '%${flooring}%'`;
    }
    if (year_built && year_built != 'null') {
      where += ` and t.year_built like '%${year_built}%' `;
    }
    if (house_size && house_size != 'null') {
      where += ` and t.area <= ${house_size}`;
    }
    if (minSize && minSize != 'null') {
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

    let sql = `select * from (${tmpView}) t where ${where}`;
    const list = await this.execSQL(db, sql);
    return { list };
  }
}

module.exports = searchRouter;