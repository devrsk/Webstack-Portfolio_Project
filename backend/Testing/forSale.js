const fs = require('fs');
const path = require('path');
const sendEmail = require("../Testing/sendEmail");

class forSaleRouter {
  async getAllImage(db, req, res) {
    try {
      const data = await db.query("SELECT * FROM FOR_SALE WHERE sale_status = 'A'");
      const openHouse = await db.query("SELECT S_ID, to_char(from_date, 'FMMonth DD YYYY') as from_date, to_char(to_date, 'FMMonth DD YYYY') as to_date FROM OPEN_HOUSE WHERE to_date > CURRENT_DATE ORDER BY S_ID ASC");

      const responseData = [];

      for (let i = 0; i < data.length; i++) {
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

        for (let k = 0; k < openHouse.length; k++) {
          if (openHouse[k].s_id === data[i].s_id) {
            data[i].open_house = openHouse[k];
          }
        }

        if (!data[i].open_house) {
          data[i].open_house = null;
        }

        responseData.push(data[i]);
      }

      res.json({
        success: true,
        dataset: responseData
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        msg: ''
      });
    }
  }

  async updateListing(db, req, res) {
    try {
      const fdata = req.body;
      const cols = [
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

      const sql = `UPDATE FOR_SALE SET Realtor_ID = $1, property_type = $2, apt_num = $3, street = $4, city = $5, state = $6, zip = $7, sale_status = $8, price = $9, bedroom = $10, bathroom = $11, livingroom = $12, flooring = $13, parking = $14, area = $15, year_built = $16, description = $17 WHERE S_ID = $18`;

      await db.query(sql, cols);

      res.json({
        success: true
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        msg: ''
      });
    }
  }

  async deleteListing(db, req, res) {
    try {
      const dir = 'public/forSale/' + req.body.s_id;
      await db.query("DELETE FROM FOR_SALE WHERE S_ID = $1", [req.body.s_id]);

      fs.rmdir(dir, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }
        console.log(`${dir} is deleted!`);
      });

      res.json({
        success: true
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        msg: ''
      });
    }
  }

  async openHouse(db, req, res) {
    try {
      const property_ID = req.body.s_id;
      const from_date = req.body.from_date;
      const to_date = req.body.to_date;
      const cols = [property_ID, from_date, to_date];

      await db.query("INSERT INTO OPEN_HOUSE VALUES ($1, $2, $3)", cols);

      res.json({
        success: true
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        msg: ''
      });
    }
  }

  async approveBuy(db, req, res) {
    try {
      const buyer_ID = req.body.id;
      const property_ID = req.body.s_id;
      const buyer_name = req.body.name;
      const cols = [buyer_ID, property_ID];

      await db.query("DELETE FROM BUYER_APPLICATION WHERE Buyer_ID = $1 AND property_ID = $2", cols);

      await db.query("UPDATE FOR_SALE SET sale_status = 'sold' WHERE S_ID = $1", [property_ID]);

      await db.query("DELETE FROM OPEN_HOUSE WHERE S_ID = $1", [property_ID]);

      const buyerData = await db.query("SELECT * FROM ACCOUNT WHERE ID = $1", [buyer_ID]);
      const email = buyerData[0].email;
      const title = "Buy Application Approved";
      const emailContent = `Hi ${buyer_name},\nYour application ${buyer_ID}-${property_ID} has been approved.`;

      const temp = new sendEmail();
      temp.sendEmail({ email, title, emailContent });

      res.json({
        success: true
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        msg: ''
      });
    }
  }

  async rejectBuy(db, req, res) {
    try {
      const buyer_ID = req.body.id;
      const property_ID = req.body.s_id;
      const buyer_name = req.body.name;
      const cols = [buyer_ID, property_ID];

      await db.query("DELETE FROM BUYER_APPLICATION WHERE Buyer_ID = $1 AND property_ID = $2", cols);

      const buyerData = await db.query("SELECT * FROM ACCOUNT WHERE ID = $1", [buyer_ID]);
      const email = buyerData[0].email;
      const title = "Buy Application Rejected";
      const emailContent = `Hi ${buyer_name},\nYour application ${buyer_ID}-${property_ID} has been rejected.`;

      const temp = new sendEmail();
      temp.sendEmail({ email, title, emailContent });

      res.json({
        success: true
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        msg: ''
      });
    }
  }
}

module.exports = forSaleRouter;