const fs = require('fs');
const path = require('path');
const sendEmail = require("../Testing/sendEmail");

class forSaleRouter {

    getAllImage(db, req, res) {

        db.query("SELECT * from FOR_SALE WHERE sale_status = 'A'", (err, data) => {

            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: 'false'
                })
                return;
            }

            //openhouse
            db.query("SELECT S_ID, DATE_FORMAT(from_date, '%M %d %Y') as from_date, DATE_FORMAT(to_date, '%M %d %Y') as to_date from OPEN_HOUSE where to_date > CURDATE() order by S_ID ASC", (err, openHouse) => {

                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: ''
                    })
                    return;
                }

                var i;
                //console.log("open house");
                //console.log(openHouse);
                var k = 0;
                for (i = 0; i < data.length; i++) {
                    let pic_folder = data[i].pic_dir
                    let pic_folder_path = pic_folder.substring(pic_folder.lastIndexOf("/") + 1);
                    let directory_name = 'public/forSale/' + pic_folder_path;
                    //console.log(directory_name);
                    let filenames = fs.readdirSync(directory_name);
                    //console.log(filenames);
                    var pic_array = [];
                    var j;
                    for (j = 0; j < filenames.length; j++) {
                        pic_array.push(pic_folder + "/" + filenames[j]);
                    }
                    //console.log(pic_array);
                    data[i].pic_dir = pic_array;
                    data[i].main_dir = pic_folder + "/outside.png";
                    //console.log("test");
                    console.log("openhouse:", openHouse);
                    console.log("k:", k);

                    for (k = 0; k < openHouse.length; k++) {
                        if (openHouse[k].S_ID === data[i].S_ID) {
                            data[i].open_house = openHouse[k];
                        }
                    }
                    if (data[i].open_house == undefined) {
                        data[i].open_house = null;
                    }
                }
                //console.log("data:", data);



                res.json({
                    success: true,
                    dataset: data
                });
                return;
            });

            //console.log(data[0].pic_dir);
            //console.log(data);



        });

    }


    updateListing(db, req, res) {
        let fdata = req.body;
        let cols = [fdata.realtor, fdata.p_type, fdata.apt_num, fdata.street, fdata.city, fdata.state, fdata.zip, fdata.status, fdata.price, fdata.bedroom, fdata.bathroom, fdata.livingroom, fdata.flooring, fdata.parking, fdata.area, fdata.year, fdata.description, fdata.S_ID];
        let sql = "UPDATE FOR_SALE SET Realtor_ID = ?, property_type = ?," +
            "apt_num = ?, street = ?, city = ?, state = ?, zip = ?," +
            "sale_status = ?, price = ?, bedroom = ?, bathroom = ?," +
            "livingroom = ?, flooring = ?, parking = ?, area = ?," +
            "year_built = ?, description = ? WHERE S_ID = ?";
        //console.log(cols);
        db.query(sql, cols, (err) => {

            if (err) {
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
        let dir = 'public/forSale/' + req.body.S_ID;

        db.query("DELETE FROM FOR_SALE WHERE S_ID = ?", [req.body.S_ID], (err) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                });
                return;
            }

            if (fs.existsSync(dir)) {
                fs.rm(dir, { recursive: true }, (err) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: 'Failed to delete the directory'
                        });
                        return;
                    }
                    console.log(`${dir} is deleted!`);
                });
            }

            res.json({
                success: true
            });
        });
    }


    openHouse(db, req, res) {
        let property_ID = req.body.S_ID;
        let from_date = req.body.from_date;
        let to_date = req.body.to_date;
        let cols = [property_ID, from_date, to_date]
        //console.log(cols);
        db.query("INSERT INTO OPEN_HOUSE VALUES (?,?,?)", cols, (err) => {

            if (err) {
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

    approveBuy(db, req, res) {
        //console.log(cols);
        let buyer_ID = req.body.ID;
        let property_ID = req.body.S_ID;
        let buyer_name = req.body.name;
        let cols = [buyer_ID, property_ID];
        db.query("DELETE FROM BUYER_APPLICATION where Buyer_ID = ? and property_ID = ?", cols, (err) => {

            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                });
                return;
            }
            // once approved, need to update property's sale_status to sold

            db.query("UPDATE FOR_SALE SET sale_status = 'sold' where S_ID = ?", [property_ID], (err) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: ''
                    });
                    return;
                }

                //delete open house for the house
                db.query("DELETE from OPEN_HOUSE where S_ID = ?", [property_ID], (err) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        });
                        return;
                    }

                    //send email to the applicant for approval email
                    db.query("SELECT * from ACCOUNT where ID = ?", buyer_ID, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false,
                                msg: ''
                            });
                            return;
                        }
                        req.email = data[0].Email;
                        req.title = "Buy Application Approved";
                        req.emailContent = "Hi " + buyer_name + ", \nYour application " + buyer_ID + "-" + property_ID + " has been approved."
                        //sendEmail;
                        var temp = new sendEmail();
                        temp.sendEmail(req, res);


                    });




                });



            });

        });

    }

    rejectBuy(db, req, res) {

        let buyer_ID = req.body.ID;
        let property_ID = req.body.S_ID;
        let buyer_name = req.body.name;
        let cols = [buyer_ID, property_ID];
        db.query("DELETE FROM BUYER_APPLICATION where Buyer_ID = ? and property_ID = ?", cols, (err) => {

            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                });
                return;
            }
            // once rejected, send email to the applicant
            db.query("SELECT * from ACCOUNT where ID = ?", buyer_ID, (err, data) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: ''
                    });
                    return;
                }
                req.email = data[0].Email;
                req.title = "Buy Application Rejected";
                req.emailContent = "Hi " + buyer_name + ", \nYour application " + buyer_ID + "-" + property_ID + " has been rejected."
                //sendEmail;
                var temp = new sendEmail();
                temp.sendEmail(req, res);


            });


        });

    }

}
module.exports = forSaleRouter;