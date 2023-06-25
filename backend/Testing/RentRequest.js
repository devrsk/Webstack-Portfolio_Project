var nodemailer = require('nodemailer');
const sendEmail = require("../Testing/sendEmail");
const db = require("./db.js");


  const rentRequest = (req, res) => {
    //const { userEmail, name, offer} = req.body;
    var renter_ID = req.body.renter_ID;
    var property_ID = req.body.property_ID;
    let credit_score = req.body.credit_score;
    let employer = req.body.employer;
    let annual_salary = req.body.annual_salary;
    var renter_name = req.body.renter_name;
    var request_status = 'P'; //pending status
    let cols = [property_ID];
    db.query('SELECT Owner_ID, Realtor_ID, pic_dir from FOR_RENT where R_ID = ?', cols, (err, data) => {
      if(err) {
        console.log(err);
        res.json({
            success: false
        });
        return;
      }

      let owner_ID = data[0].Owner_ID;
      let realtor_ID = data[0].Realtor_ID;
      console.log('owner ID', owner_ID);
      console.log('realtor ID', realtor_ID);
      let main_pic = data[0].pic_dir + "/outside.png";
      //let realtor_ID = data[0].Realtor_ID;
      let col = [renter_ID, property_ID, owner_ID, renter_name, credit_score, employer, annual_salary, request_status, main_pic];
      db.query('INSERT INTO RENTER_APPLICATION VALUES (?,?,?,?,?,?,?,?,?)', col, (err) =>{
        if(err) {
            console.log(err);
            res.json({
                success: false
            });
            return;
        }
        //console.log("Calling Send Email");
      });

      //send email to owner
        var ownerEmail;
        var ownerUsername;
        var realtorEmail;
        var realtorUsername;
        let sql = '';
        let col2 = [];
        if(realtor_ID == undefined){
          sql = "SELECT username, Email from ACCOUNT where ID = ?";
          col2 = [owner_ID];
        } else {
          sql = "SELECT username, Email from ACCOUNT where ID IN (?,?)";
          col2 = [owner_ID, realtor_ID];
        }
        console.log("sql: ", sql);
        console.log(col2);
        db.query(sql, col2, (err, data) =>{
            if(err) {
              console.log(err);
              res.json({
                  success: false
              });
              return;
            }
    
            //send email to owner
            ownerUsername = data[0].username;
            ownerEmail = data[0].Email;
            let emailContent = "Hi " + ownerUsername + ", \n" + renter_name + " sent you an request for rent for property " + property_ID + ".";
            emailContent = emailContent + "\nPlease check your application list to approve/reject."
            req.email = ownerEmail;
            req.title = "Rent Request";
            req.emailContent = emailContent;
            var temp = new sendEmail();
            temp.sendEmail(req, res);

            //send email to realtor
            if(data.length > 1){
              console.log("Send to realtor");
              realtorUsername = data[1].username;
              realtorEmail = data[1].Email;

              let emailContent = "Hi " + realtorUsername + ", \n" + renter_name + " sent you an request for rent for property " + property_ID + ".";
              emailContent = emailContent + "\nPlease check your application list to approve/reject."
              req.email = realtorEmail;
              req.title = "Rent Request";
              req.emailContent = emailContent;
              //var temp1 = new sendEmail();
              temp.sendEmail(req, res);

            }

            res.json({
                    success: true,
                    msg: ''
                    });

    
    
        });
    });
  };


module.exports = rentRequest;