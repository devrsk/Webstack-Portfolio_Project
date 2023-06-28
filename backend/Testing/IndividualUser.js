const fs = require('fs');
const path = require('path');
const db = require('../Testing/db');

class individualUser {

    forSaleListing(db, req, res) {
        let sql = '';
        let cols = [];
        console.log("req", req.body.ID);
        if (req.body.role === 'R') {
            sql = "SELECT * from FOR_SALE WHERE Owner_ID = ? AND sale_status = 'A' UNION ALL SELECT * from FOR_SALE WHERE Realtor_ID = ? AND sale_status = 'A' ";
            cols = [req.body.ID, req.body.ID];
        } else {
            sql = "SELECT * from FOR_SALE WHERE Owner_ID = ? AND sale_status = 'A'";
            cols = [req.body.ID];
        }
        db.query(sql, cols, (err, data) => {

            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: 'false'
                })
                return;
            }

            db.query("SELECT * from OPEN_HOUSE order by S_ID ASC", (err, openHouse) => {
                var i;
                console.log("open house");
                console.log(openHouse);
                var k = 0;
                for (i = 0; i < data.length; i++) {
                    //data[i].pic_dir = data[i].pic_dir + '/outside.png'
                    let pic_folder = data[i].pic_dir
                    let pic_folder_path = pic_folder.substring(pic_folder.lastIndexOf("/") + 1);
                    let directory_name = 'public/forSale/' + pic_folder_path;
                    console.log(directory_name);
                    let filenames = fs.readdirSync(directory_name);
                    console.log(filenames);
                    var pic_array = [];
                    var j;
                    for (j = 0; j < filenames.length; j++) {
                        pic_array.push(pic_folder + "/" + filenames[j]);
                    }
                    console.log(pic_array);
                    data[i].pic_dir = pic_array;
                    data[i].main_dir = pic_folder + "/outside.png";
                    //console.log("test");

                    for (k = 0; k < openHouse.length; k++) {
                        if (openHouse[k].S_ID === data[i].S_ID) {
                            data[i].open_house = openHouse[k];
                        }
                    }
                    if (data[i].open_house == undefined) {
                        data[i].open_house = null;
                    }


                }

                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: 'false'
                    })
                    return;
                }


                res.json({
                    success: true,
                    dataset: data
                });
                return;
            });

        });

    }


    buyerApplication(db, req, res) {

        if (req.body.role === 'R') {
            db.query("SELECT S_ID from FOR_SALE WHERE Realtor_ID = ?", [req.body.ID], (err, properties) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: ''
                    });
                    return;
                }

                if (properties.length > 0) {
                    //console.log("properties: ", properties[0]);
                    var i;
                    let p_list = '(' + properties[0].S_ID;
                    for (i = 1; i < properties.length; i++) {
                        p_list = p_list + ', ' + properties[i].S_ID;
                    }
                    p_list = p_list + ')';
                    //console.log("p_list: ", p_list);

                    db.query(`SELECT * from BUYER_APPLICATION WHERE (property_ID IN ${p_list} OR owner_ID = ${req.body.ID}) AND offer_status = 'P'`, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false,
                                msg: ''
                            });
                            return;
                        }

                        res.json({
                            success: true,
                            dataset: data
                        });
                        return;
                    });
                } else {
                    res.json({
                        success: true,
                        dataset: []
                    });
                    return;
                }


            });

        } else {
            db.query("SELECT * from BUYER_APPLICATION WHERE owner_ID = ? and offer_status = 'P'", [req.body.ID], (err, data) => {

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
                    success: true,
                    dataset: data
                });
                return;
            });

        }


    }

    forRentListing(db, req, res) {
        let sql = '';
        let cols = [];
        if (req.body.role === 'R') {
            sql = "SELECT * from FOR_RENT WHERE Owner_ID = ? AND status = 'A' UNION ALL SELECT * from FOR_RENT WHERE Realtor_ID = ? AND status = 'A'";
            cols = [req.body.ID, req.body.ID];
        } else {
            sql = "SELECT * from FOR_RENT WHERE Owner_ID = ? AND status = 'A'";
            cols = [req.body.ID];
        }
        db.query(sql, cols, (err, data) => {

            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: 'false'
                })
                return;
            }

            db.query("SELECT * from VISIT order by property_ID ASC, start_time ASC", (err, visit) => {
                var i;
                console.log("visit");
                console.log(visit);
                var k = 0;
                for (i = 0; i < data.length; i++) {
                    //data[i].pic_dir = data[i].pic_dir + '/outside.png'
                    let pic_folder = data[i].pic_dir
                    let pic_folder_path = pic_folder.substring(pic_folder.lastIndexOf("/") + 1);
                    let directory_name = 'public/forRent/' + pic_folder_path;
                    console.log(directory_name);
                    let filenames = fs.readdirSync(directory_name);
                    console.log(filenames);
                    var pic_array = [];
                    var visit_array = [];
                    var j;
                    for (j = 0; j < filenames.length; j++) {
                        pic_array.push(pic_folder + "/" + filenames[j]);
                    }
                    console.log(pic_array);
                    data[i].pic_dir = pic_array;
                    data[i].main_dir = pic_folder + "/outside.png";
                    //console.log("test");
                    for (k = 0; k < visit.length; k++) {
                        if (visit[k].property_ID === data[i].R_ID) {
                            visit_array.push(visit[k]);
                        }
                    }

                    if (visit_array.length == 0) {
                        data[i].visit = null;
                    } else {
                        data[i].visit = visit_array;
                        visit_array = [];
                    }


                }

                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: 'false'
                    })
                    return;
                }


                res.json({
                    success: true,
                    dataset: data
                });
                return;
            });

        });

    }

    renterApplication(db, req, res) {

        if (req.body.role === 'R') {
            db.query("SELECT R_ID from FOR_RENT where Realtor_ID = ?", [req.body.ID], (err, properties) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: ''
                    });
                    return;
                }

                if (properties.length > 0) {
                    //console.log("properties: ", properties[0]);
                    var i;
                    let p_list = '(' + properties[0].R_ID;
                    for (i = 1; i < properties.length; i++) {
                        p_list = p_list + ', ' + properties[i].R_ID;
                    }
                    p_list = p_list + ')';
                    //console.log("p_list: ", p_list);

                    db.query(`SELECT * from RENTER_APPLICATION WHERE (property_ID IN ${p_list} OR owner_ID = ${req.body.ID}) AND request_status = 'P'`, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false,
                                msg: ''
                            });
                            return;
                        }

                        res.json({
                            success: true,
                            dataset: data
                        });
                        return;
                    });
                } else {
                    res.json({
                        success: true,
                        dataset: []
                    });
                    return;
                }
            });

        } else {
            db.query("SELECT * from RENTER_APPLICATION WHERE owner_ID = ? and request_status = 'P'", [req.body.ID], (err, data) => {

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
                    success: true,
                    dataset: data
                });
                return;
            });

        }


    }

}
module.exports = individualUser;
