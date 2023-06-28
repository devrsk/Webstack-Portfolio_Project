const db = require('./db');

const uploadFiles = async (req, res) => {
  try {

    sql = '';


    if (req.body.list_type === 'sell') {
      file_path = 'http://localhost:9000/forSale_pic/';

      sql = 'SELECT MAX(S_ID) AS ID FROM FOR_SALE';
    } else {
      file_path = 'http://localhost:9000/forRent_pic/';
      sql = 'SELECT MAX(R_ID) AS ID FROM FOR_RENT';
    }


    picture_path = file_path + f_num;

    let fdata = req.body;
    console.log("this is fdata.realtor", fdata.realtor);
    console.log("this is fdata.Realtor_ID", fdata.Realtor_ID);
    var r = null;
    console.log("realtor_ID", req.body.Realtor_ID);
    if (req.body.Realtor_ID === '') {
      r = null;
    } else {
      r = req.body.Realtor_ID;
    }
    console.log("I'm here", r);
    if (req.body.list_type == 'sell') {
      cols = [fdata.owner, r, fdata.p_type, fdata.apt_num, fdata.street, fdata.city, fdata.state, fdata.zip, fdata.status, fdata.price, fdata.bedroom, fdata.bathroom, fdata.livingroom, fdata.flooring, fdata.parking, fdata.area, fdata.year, fdata.description, picture_path];
      sql2 = 'INSERT INTO FOR_SALE (Owner_ID,Realtor_ID,property_type,apt_num,street,city,state,zip,sale_status,price,bedroom,bathroom,livingroom,flooring,parking,area,year_built,description,pic_dir) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    } else {
      cols = [fdata.Owner_ID, r, fdata.property_type, fdata.apt_num, fdata.street, fdata.city, fdata.state, fdata.zip, fdata.available_date, fdata.rate, fdata.lease_term, fdata.security_deposit, fdata.bedroom, fdata.bathroom, fdata.livingroom, fdata.parking, fdata.flooring, fdata.area, fdata.year_built, fdata.ammenities, fdata.description, picture_path, fdata.status];
      sql2 = 'INSERT INTO FOR_RENT (Owner_ID,Realtor_ID,property_type,apt_num,street,city,state,zip,available_date, rate, lease_term, security_deposit, bedroom,bathroom,livingroom,parking,flooring,area,year_built,ammenities, description,pic_dir,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    }


    db.query(sql2, cols, (err) => {

      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: ''
        })
        return;
      }

      res.json({
        success: true,
        msg: 'Property added successfully'
      });
      return;
    });





  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles
};