const fs = require('fs');
const path = require('path');
const sendEmail = require("../Testing/sendEmail");
//const nodemailer = require('nodemailer');
//npm install express multer --save
class forRentRouter{

        getAllImage(db, req, res) {
            // let username = req.body.username;
            // let userID = req.body.id;

             //let cols = ['%outside%'];
            db.query("SELECT * from FOR_RENT where status = 'A'", (err, data) => {

                if(err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: 'false'
                    })
                    return;
                }

                var i;
                for(i=0; i<data.length; i++){
                    //data[i].pic_dir = data[i].pic_dir + '/outside.png'
                    let pic_folder = data[i].pic_dir
                    let pic_folder_path = pic_folder.substring(pic_folder.lastIndexOf("/")+1);
                    let directory_name = 'public/forRent/' + pic_folder_path;
                    //console.log(directory_name);
                    let filenames = fs.readdirSync(directory_name);
                    //console.log(filenames);
                    var pic_array = [];
                    var j;
                    for(j=0; j<filenames.length; j++){
                        pic_array.push(pic_folder + "/" + filenames[j]);
                    }
                    //console.log(pic_array);
                    data[i].pic_dir = pic_array;
                    data[i].main_dir = pic_folder + "/outside.png";
       
                }
                console.log(data);

                res.json({
                    success: true,
                    dataset: data
                });
                return;

                
            });

        }

        updateListing(db, req, res) {
            let fdata = req.body;
            let cols = [fdata.Realtor_ID, fdata.property_type, fdata.apt_num, fdata.street, fdata.city, fdata.state, fdata.zip, fdata.available_date, fdata.rate, fdata.lease_term, fdata.security_deposit, fdata.bedroom, fdata.bathroom, fdata.livingroom, fdata.parking, fdata.flooring, fdata.area, fdata.year_built, fdata.ammenities, fdata.description,fdata.R_ID];
            let sql = "UPDATE FOR_RENT SET Realtor_ID = ?, property_type = ?," +
                        "apt_num = ?, street = ?, city = ?, state = ?, zip = ?," +
                        "available_date = ?, rate = ?, lease_term = ?, security_deposit = ?, bedroom = ?, bathroom = ?," +
                        "livingroom = ?, parking = ?, flooring = ?, area = ?," +
                        "year_built = ?, ammenities = ?, description = ? WHERE R_ID = ?";
            //console.log(cols);
            db.query(sql, cols, (err) => {

                if(err) {
                    console.log(err);
                    res.json({
                    success: false,
                    msg: ''
                    });
                    return;
                }
                //console.log(data);
                res.json({
                success: true
                });
                return;
            });

        }

        deleteListing(db, req, res) {
            //console.log(cols);
            //console.log("R_ID:",req.body.R_ID);
            let dir = 'public/forRent/' + req.body.R_ID;
            db.query("DELETE from FOR_RENT WHERE R_ID = ?", [req.body.R_ID], (err) => {

                if(err) {
                    console.log(err);
                    res.json({
                    success: false,
                    msg: ''
                    });
                    return;
                }
                // once deleted from database, delete pictures in the forRent folder
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

        visit(db, req, res) {
            let visitor_ID = req.body.ID;
            let property_ID = req.body.property_ID;
            let start_time = req.body.start_time;
            let end_time = req.body.end_time;
            let cols = [visitor_ID, property_ID, start_time, end_time];

            //check if the time slot is occupied
            //console.log(cols);
            db.query("INSERT INTO VISIT VALUES (?,?,?,?)", cols, (err) => {

                if(err) {
                    console.log(err);
                    res.json({
                    success: false,
                    msg: ''
                    });
                    return;
                }
                //console.log(data);
                res.json({
                success: true
                });
                return;
            });

        }

        approveRent(db, req, res) {
            //console.log(cols);
            let renter_ID = req.body.renter_ID;
            let property_ID = req.body.property_ID;
            let renter_name = req.body.renter_name;

            let cols = [renter_ID, property_ID];
            db.query("DELETE FROM RENTER_APPLICATION WHERE RENTER_ID = ? and property_ID = ?", cols, (err) => {

                if(err) {
                    console.log(err);
                    res.json({
                    success: false,
                    msg: ''
                    });
                    return;
                }
                // once approved, need to update property's available data to earlier than today

                db.query("UPDATE FOR_RENT SET status = 'N' where R_ID = ?", [property_ID], (err) =>{
                    if(err) {
                        console.log(err);
                        res.json({
                        success: false,
                        msg: ''
                        });
                        return;
                    }

                    //delete visit for the house
                    db.query("DELETE from VISIT where property_ID = ?", [property_ID], (err) =>{
                        if(err) {
                            console.log(err);
                            res.json({
                            success: false,
                            msg: ''
                            });
                            return;
                        }
                    
                        //send email to the applicant for approval email
                        db.query("SELECT * from ACCOUNT where ID = ?", renter_ID, (err, data) => {
                            if(err) {
                                console.log(err);
                                res.json({
                                success: false,
                                msg: ''
                                });
                                return;
                            }
                            req.email = data[0].Email;
                            req.title = "Rent Application Approved";
                            req.emailContent = "Hi " + renter_name + ", \nYour rent application " + renter_ID + "-" + property_ID + " has been approved."
                            //sendEmail;
                            var temp = new sendEmail();
                            temp.sendEmail(req, res);
                            // res.json({
                            //     success: true,
                            //     msg: ''
                            //     });
                        
                        
                        });

                    


                    });

                    

                });
                
            });

        }

        rejectRent(db, req, res) {
           
            let renter_ID = req.body.renter_ID;
            let property_ID = req.body.property_ID;
            let renter_name = req.body.renter_name;
            let cols = [renter_ID, property_ID];
            db.query("DELETE FROM RENTER_APPLICATION where RENTER_ID = ? and property_ID = ?", cols, (err) => {

                if(err) {
                    console.log(err);
                    res.json({
                    success: false,
                    msg: ''
                    });
                    return;
                }
                // once rejected, send email to the applicant
                db.query("SELECT * from ACCOUNT where ID = ?", [renter_ID], (err, data) => {
                    if(err) {
                        console.log(err);
                        res.json({
                        success: false,
                        msg: ''
                        });
                        return;
                    }
                    req.email = data[0].Email;
                    req.title = "Rent Application Rejected";
                    req.emailContent = "Hi " + renter_name + ", \nYour rent application " + renter_ID + "-" + property_ID + " has been rejected."
                    //sendEmail;
                    var temp = new sendEmail();
                    temp.sendEmail(req, res);
                    // res.json({
                    //     success: true,
                    //     msg: ''
                    //     });


                });

             
            });

        }
 
}
module.exports = forRentRouter;
