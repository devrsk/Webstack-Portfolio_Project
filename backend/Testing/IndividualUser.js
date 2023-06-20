const nodemailer = require('nodemailer');
const sendEmail = require("../Testing/sendEmail");
const { pool } = require("./db.js");

const buyRequest = (req, res) => {
  const { ID: Buyer_ID, S_ID: property_ID, name: buyer_name, offer: offer_price } = req.body;
  const offer_status = 'P'; // Pending status

  pool.connect((err, client, done) => {
    if (err) {
      console.log(err);
      res.json({
        success: false
      });
      return;
    }

    const selectQuery = 'SELECT Owner_ID, Realtor_ID, pic_dir FROM FOR_SALE WHERE S_ID = $1';
    const selectParams = [property_ID];

    client.query(selectQuery, selectParams, (err, data) => {
      if (err) {
        done();
        console.log(err);
        res.json({
          success: false
        });
        return;
      }

      const owner_ID = data.rows[0].owner_id;
      const realtor_ID = data.rows[0].realtor_id;
      const main_pic = data.rows[0].pic_dir + "/outside.png";
      const insertQuery = 'INSERT INTO BUYER_APPLICATION VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const insertParams = [Buyer_ID, property_ID, owner_ID, buyer_name, offer_price, offer_status, main_pic];

      client.query(insertQuery, insertParams, (err) => {
        done();
        if (err) {
          console.log(err);
          res.json({
            success: false
          });
          return;
        }

        // Send email to owner
        const ownerQuery = 'SELECT username, Email FROM ACCOUNT WHERE ID = $1';
        const ownerParams = [owner_ID];

        client.query(ownerQuery, ownerParams, (err, data) => {
          if (err) {
            console.log(err);
            res.json({
              success: false
            });
            return;
          }

          const ownerUsername = data.rows[0].username;
          const ownerEmail = data.rows[0].email;
          let emailContent = `Hi ${ownerUsername},\n${buyer_name} sent you an offer of $${offer_price} for property ${property_ID}.`;
          emailContent += "\nPlease check your application list to approve/reject.";
          req.email = ownerEmail;
          req.title = "Buy Request";
          req.emailContent = emailContent;
          const temp = new sendEmail();
          temp.sendEmail(req, res);

          // Send email to realtor if available
          if (realtor_ID) {
            const realtorQuery = 'SELECT username, Email FROM ACCOUNT WHERE ID = $1 OR ID = $2';
            const realtorParams = [owner_ID, realtor_ID];

            client.query(realtorQuery, realtorParams, (err, data) => {
              if (err) {
                console.log(err);
                res.json({
                  success: false
                });
                return;
              }

              const realtorUsername = data.rows[1].username;
              const realtorEmail = data.rows[1].email;
              let emailContent = `Hi ${realtorUsername},\n${buyer_name} sent you an offer of $${offer_price} for property ${property_ID}.`;
              emailContent += "\nPlease check your application list to approve/reject.";
              req.email = realtorEmail;
              req.title = "Buy Request";
              req.emailContent = emailContent;
              const temp = new sendEmail();
              temp.sendEmail(req, res);
            });
          }

          res.json({
            success: true,
            msg: ''
          });
        });
      });
    });
  });
};

module.exports = buyRequest;