const multer = require("multer");
const db = require('./db');
var fs = require('fs');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    f_path = '';
    sql = '';
    console.log("req.body.list_type", req.body.list_type);
    console.log("req.body.owner", req.body.owner);
    console.log("req.body", req.body);
    if (req.body.list_type == 'sell') {
      f_path = 'public/forSale/';
      sql = 'SELECT MAX(S_ID) AS ID FROM FOR_SALE';
    } else {
      f_path = 'public/forRent/';
      sql = 'SELECT MAX(R_ID) AS ID FROM FOR_RENT';
    }
    db.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          success: false
        });
        return;
      }

      if (data[0].ID === null) {
        pic_path = f_path + '1/';
        f_num = 1;
        !fs.existsSync(pic_path) && fs.mkdirSync(pic_path);
        cb(null, pic_path);

      }
      else {
        pic_path = f_path + (data[0].ID + 1) + '/';
        f_num = data[0].ID + 1;
        !fs.existsSync(pic_path) && fs.mkdirSync(pic_path);
        cb(null, pic_path);

      }

    });
  },

  filename: function (req, file, cb) {

    if (file.fieldname === 'main') {
      cb(null, 'outside.png');
    } else {
      cb(null, file.originalname);
    }

  }
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;