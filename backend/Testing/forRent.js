const fs = require('fs');
const path = require('path');
const sendEmail = require("../Testing/sendEmail");
//const nodemailer = require('nodemailer');
//npm install express multer --save

class forRentRouter {

    getAllImage(client, req, res) {
        client.query("SELECT * FROM FOR_RENT WHERE status = 'A'", (err, data) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: 'false'
                });
                return;
            }

            data.rows.forEach((row) => {
                let pic_folder = row.pic_dir;
                let pic_folder_path = pic_folder.substring(pic_folder.lastIndexOf("/") + 1);
                let directory_name = 'public/forRent/' + pic_folder_path;
                let filenames = fs.readdirSync(directory_name);
                var pic_array = [];
                filenames.forEach((filename) => {
                    pic_array.push(pic_folder + "/" + filename);
                });

                row.pic_dir = pic_array;
                row.main_dir = pic_folder + "/outside.png";
            });

            console.log(data.rows);

            res.json({
                success: true,
                dataset: data.rows
            });
        });
    }

    updateListing(client, req, res) {
        let fdata = req.body;
        let cols = [
            fdata.Realtor_ID, fdata.property_type, fdata.apt_num, fdata.street, fdata.city,
            fdata.state, fdata.zip, fdata.available_date, fdata.rate, fdata.lease_term,
            fdata.security_deposit, fdata.bedroom, fdata.bathroom, fdata.livingroom, fdata.parking,
            fdata.flooring, fdata.area, fdata.year_built, fdata.ammenities, fdata.description, fdata.R_ID
        ];
        let sql = "UPDATE FOR_RENT SET Realtor_ID = $1, property_type = $2, apt_num = $3, street = $4, city = $5, " +
            "state = $6, zip = $7, available_date = $8, rate = $9, lease_term = $10, security_deposit = $11, " +
            "bedroom = $12, bathroom = $13, livingroom = $14, parking = $15, flooring = $16, area = $17, " +
            "year_built = $18, ammenities = $19, description = $20 WHERE R_ID = $21";
        
        client.query(sql, cols, (err) => {
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
        });
    }

    deleteListing(client, req, res) {
        let dir = 'public/forRent/' + req.body.R_ID;
        client.query("DELETE FROM FOR_RENT WHERE R_ID = $1", [req.body.R_ID], (err) => {
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
        });
    }

    visit(client, req, res) {
        let visitor_ID = req.body.ID;
        let property_ID = req.body.property_ID;
        let start_time = req.body.start_time;
        let end_time = req.body.end_time;
        let cols = [visitor_ID, property_ID, start_time, end_time];

        client.query("INSERT INTO VISIT VALUES ($1, $2, $3, $4)", cols, (err) => {
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
        });
    }

    approveRent(client, req, res) {
        let renter_ID = req.body.renter_ID;
        let property_ID = req.body.property_ID;
        let renter_name = req.body.renter_name;
        let cols = [renter_ID, property_ID];

        client.query("DELETE FROM RENTER_APPLICATION WHERE RENTER_ID = $1 AND property_ID = $2", cols, (err) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                });
                return;
            }

            client.query("UPDATE FOR_RENT SET status = 'N' WHERE R_ID = $1", [property_ID], (err) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: ''
                    });
                    return;
                }

                client.query("DELETE FROM VISIT WHERE property_ID = $1", [property_ID], (err) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        });
                        return;
                    }

                    client.query("SELECT * FROM ACCOUNT WHERE ID = $1", [renter_ID], (err, data) => {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false,
                                msg: ''
                            });
                            return;
                        }
                        req.email = data.rows[0].Email;
                        req.title = "Rent Application Approved";
                        req.emailContent = "Hi " + renter_name + ", \nYour rent application " + renter_ID + "-" + property_ID + " has been approved.";
                        var temp = new sendEmail();
                        temp.sendEmail(req, res);
                    });
                });
            });
        });
    }

    rejectRent(client, req, res) {
        let renter_ID = req.body.renter_ID;
        let property_ID = req.body.property_ID;
        let renter_name = req.body.renter_name;
        let cols = [renter_ID, property_ID];

        client.query("DELETE FROM RENTER_APPLICATION WHERE RENTER_ID = $1 AND property_ID = $2", cols, (err) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                });
                return;
            }

            client.query("SELECT * FROM ACCOUNT WHERE ID = $1", [renter_ID], (err, data) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: ''
                    });
                    return;
                }
                req.email = data.rows[0].Email;
                req.title = "Rent Application Rejected";
                req.emailContent = "Hi " + renter_name + ", \nYour rent application " + renter_ID + "-" + property_ID + " has been rejected.";
                var temp = new sendEmail();
                temp.sendEmail(req, res);
            });
        });
    }
}

module.exports = forRentRouter;