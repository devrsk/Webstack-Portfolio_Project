const multer = require("multer");
const db = require('../Testing/db');
const fs = require('fs');
const path = require('path');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let f_path = '';
    let sql = '';
    console.log("req.body.list_type", req.body.list_type);
    console.log("req.body.owner", req.body.owner);
    console.log("req.body", req.body);
    if (req.body.list_type === 'sell') {
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

      const baseDir = path.join(__dirname, '..');
      const fullPath = path.join(baseDir, f_path);
      const subDir = data[0].ID === null ? '1' : (data[0].ID + 1).toString();
      const pic_path = path.join(fullPath, subDir);

      fs.mkdirSync(pic_path, { recursive: true });
      cb(null, pic_path);
    });
  },

  filename: function(req, file, cb) {
    if (file.fieldname === 'main') {
      cb(null, 'outside.png');
    } else {
      cb(null, file.originalname);
    }
  }
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;