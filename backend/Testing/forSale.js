const fs = require('fs');
const path = require('path');
const sendEmail = require("../Testing/sendEmail");

class forSaleRouter {
  getAllImage(db, req, res) {
    db.query("SELECT * FROM FOR_SALE WHERE sale_status = 'A'", (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: 'false'
        });
        return;
      }

      db.query("SELECT S_ID, to_char(from_date, 'Month DD YYYY') as from_date, to_char(to_date, 'Month DD YYYY') as to_date FROM OPEN_HOUSE WHERE to_date > CURRENT_DATE ORDER BY S_ID ASC", (err, openHouse) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            msg: ''
          });
          return;
        }

        let i;
        let k = 0;

        for (i = 0; i < data.length; i++) {
          let pic_folder = data[i].pic_dir;
          let pic_folder_path = pic_folder.substring(pic_folder.lastIndexOf("/") + 1);
          let directory_name = 'public/forSale/' + pic_folder_path;
          let filenames = fs.readdirSync(directory_name);
          let pic_array = [];

          for (let j = 0; j < filenames.length; j++) {
            pic_array.push(pic_folder + "/" + filenames[j]);
          }

          data[i].pic_dir = pic_array;
          data[i].main_dir = pic_folder + "/outside.png";

          for (k = 0; k < openHouse.length; k++) {
            if (openHouse[k].s_id === data[i].s_id) {
              data[i].open_house = openHouse[k];
            }
          }

          if (data[i].open_house == undefined) {
            data[i].open_house = null;
          }
        }

        res.json({
          success: true,
          dataset: data
        });
        return;
      });
    });
  }

  updateListing(db, req, res) {
    let fdata = req.body;
    let cols = [
      fdata.realtor,
      fdata.p_type,
      fdata.apt_num,
      fdata.street,
      fdata.city,
      fdata.state,
      fdata.zip,
      fdata.status,
      fdata.price,
      fdata.bedroom,
      fdata.bathroom,
      fdata.livingroom,
      fdata.flooring,
      fdata.parking,
      fdata.area,
      fdata.year,
      fdata.description,
      fdata.s_id
    ];
    let sql = `UPDATE FOR_SALE SET realtor_id = $1, property_type = $2, apt_num = $3, street = $4, city = $5, state = $6, zip = $7, sale_status = $8, price = $9, bedroom = $10, bathroom = $11, livingroom = $12, flooring = $13, parking = $14, area = $15, year_built = $16, description = $17 WHERE s_id = $18`;

    db.query(sql, cols, (err) => {
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
  }

  deleteListing(db, req, res) {
    let dir = 'public/forSale/' + req.body.s_id;

    db.query("DELETE FROM FOR_SALE WHERE s_id = $1", [req.body.s_id], (err) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: ''
        });
        return;
      }

      fs.rmdir(dir, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }
        console.log(`${dir} is deleted!`);
      });

      res.json({
        success: true
      });
      return;
    });
  }

  openHouse(db, req, res) {
    let property_ID = req.body.s_id;
    let from_date = req.body.from_date;
    let to_date = req.body.to_date;
    let cols = [property_ID, from_date, to_date];

    db.query("INSERT INTO OPEN_HOUSE VALUES ($1, $2, $3)", cols, (err) => {
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
  }

  approveBuy(db, req, res) {
    let buyer_ID = req.body.id;
    let property_ID = req.body.s_id;
    let buyer_name = req.body.name;
    let cols = [buyer_ID, property_ID];

    db.query("DELETE FROM BUYER_APPLICATION WHERE buyer_id = $1 AND property_id = $2", cols, (err) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: ''
        });
        return;
      }

      db.query("UPDATE FOR_SALE SET sale_status = 'sold' WHERE s_id = $1", [property_ID], (err) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            msg: ''
          });
          return;
        }

        db.query("DELETE FROM OPEN_HOUSE WHERE s_id = $1", [property_ID], (err) => {
          if (err) {
            console.log(err);
            res.json({
              success: false,
              msg: ''
            });
            return;
          }

          db.query("SELECT * FROM ACCOUNT WHERE id = $1", buyer_ID, (err, data) => {
            if (err) {
              console.log(err);
              res.json({
                success: false,
                msg: ''
              });
              return;
            }

            req.email = data[0].email;
            req.title = "Buy Application Approved";
            req.emailContent = `Hi ${buyer_name}, \nYour application ${buyer_ID}-${property_ID} has been approved.`;

            var temp = new sendEmail();
            temp.sendEmail(req, res);
          });
        });
      });
    });
  }

  rejectBuy(db, req, res) {
    let buyer_ID = req.body.id;
    let property_ID = req.body.s_id;
    let buyer_name = req.body.name;
    let cols = [buyer_ID, property_ID];

    db.query("DELETE FROM BUYER_APPLICATION WHERE buyer_id = $1 AND property_id = $2", cols, (err) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          msg: ''
        });
        return;
      }

      db.query("SELECT * FROM ACCOUNT WHERE id = $1", buyer_ID, (err, data) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            msg: ''
          });
          return;
        }

        req.email = data[0].email;
        req.title = "Buy Application Rejected";
        req.emailContent = `Hi ${buyer_name}, \nYour application ${buyer_ID}-${property_ID} has been rejected.`;

        var temp = new sendEmail();
        temp.sendEmail(req, res);
      });
    });
  }
}

module.exports = forSaleRouter;