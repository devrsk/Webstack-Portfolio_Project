const db = require('../Testing/db');

const uploadFiles = async (req, res) => {
  try {
    let sql = '';
    let file_path = '';

    if (req.body.list_type === 'sell') {
      file_path = 'http://localhost:9000/forSale_pic/';
      sql = 'SELECT MAX(S_ID) AS ID FROM FOR_SALE';
    } else {
      file_path = 'http://localhost:9000/forRent_pic/';
      sql = 'SELECT MAX(R_ID) AS ID FROM FOR_RENT';
    }

    const picture_path = `${file_path}${f_num}`;

    const fdata = req.body;
    console.log("this is fdata.realtor", fdata.realtor);
    console.log("this is fdata.Realtor_ID", fdata.Realtor_ID);
    let r = null;
    console.log("realtor_ID", req.body.Realtor_ID);
    if (req.body.Realtor_ID === '') {
      r = null;
    } else {
      r = req.body.Realtor_ID;
    }
    console.log("I'm here", r);
    let cols = [];
    let sql2 = '';

    if (req.body.list_type === 'sell') {
      cols = [
        fdata.owner, r, fdata.p_type, fdata.apt_num, fdata.street, fdata.city, fdata.state, fdata.zip, fdata.status,
        fdata.price, fdata.bedroom, fdata.bathroom, fdata.livingroom, fdata.flooring, fdata.parking, fdata.area,
        fdata.year, fdata.description, picture_path
      ];
      sql2 = 'INSERT INTO FOR_SALE (Owner_ID,Realtor_ID,property_type,apt_num,street,city,state,zip,sale_status,price,bedroom,bathroom,livingroom,flooring,parking,area,year_built,description,pic_dir) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)';
    } else {
      cols = [
        fdata.Owner_ID, r, fdata.property_type, fdata.apt_num, fdata.street, fdata.city, fdata.state, fdata.zip,
        fdata.available_date, fdata.rate, fdata.lease_term, fdata.security_deposit, fdata.bedroom, fdata.bathroom,
        fdata.livingroom, fdata.parking, fdata.flooring, fdata.area, fdata.year_built, fdata.ammenities,
        fdata.description, picture_path, fdata.status
      ];
      sql2 = 'INSERT INTO FOR_RENT (Owner_ID,Realtor_ID,property_type,apt_num,street,city,state,zip,available_date,rate,lease_term,security_deposit,bedroom,bathroom,livingroom,parking,flooring,area,year_built,ammenities,description,pic_dir,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)';
    }

    db.query(sql2, cols, (err) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: ''
        });
        return;
      }

      res.json({
        success: true
      });
      return;
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying to upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles
};