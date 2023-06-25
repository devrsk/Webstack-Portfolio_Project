const express = require("express");
const bodyParser = require("body-parser");
const login = require('../Testing/login');
const db = require('../Testing/db');
const signup = require('../Testing/signup');
const alluser = require('../Testing/alluser');
const uploadController = require("../Testing/uploadDb");
const upload = require("../Testing/upload");
const forSale = require('../Testing/forSale');
const forRent = require('../Testing/forRent');
const search = require('../Testing/search');
const favorite = require('../Testing/favorite');
const buyRequest = require("../Testing/BuyRequest");
const rentRequest = require("../Testing/RentRequest");
const individualUser = require("../Testing/IndividualUser");
const realtor = require('../Testing/realtor');  

var cors = require("cors");

const app = express();
//app.set("view engine", "ejs");

app.use("/forSale_pic", express.static("public/forSale"));
app.use("/forRent_pic", express.static("public/forRent"));
// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cors());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PropertyPro" });
});

app.post("/login", function(req, res) {
    console.log("Req Body : ", req.body);
    var temp = new login();
    temp.login(db, req, res);
  });

  app.post("/register", function(req, res) {
    console.log("Req Body : ", req.body);
    var temp = new signup();
    temp.register(db, req, res);
  });

app.get("/get_user", function(req, res) {
    console.log("Req Body : ", req.body);
    var temp = new alluser();
    temp.allUser(db, req, res);
  });

  app.post("/update_user", function(req, res) {
    console.log("Req Body : ", req.body);
    var temp = new alluser();
    temp.updateUser(db, req, res);
  });

  app.post("/remove_user", function(req, res) {
    console.log("Req Body : ", req.body);
    var temp = new alluser();
    temp.removeUser(db, req, res);
  });

  //get house info for Buy page
    app.get("/house", function(req, res) {
      console.log("Req Body : ", req.body);
      var temp = new forSale();
      temp.getAllImage(db, req, res);
    });

  //get house info for Rent page
  app.get("/rent", function(req, res) {
    console.log("Req Body : ", req.body);
    var temp = new forRent();
    temp.getAllImage(db, req, res);
  });

  // list property for sale OR list property for rent
  app.post("/upload", upload.fields([{ name: 'main', maxCount: 1 }, { name: 'others', maxCount: 10 }]), uploadController.uploadFiles);

  // schedule open house
  app.post("/openHouse", function(req, res){
    console.log("Req Body: ", req.body);
    var temp = new forSale();
    temp.openHouse(db, req, res);
  });

    // delete listed house for sale
    app.post("/deleteForSale", function(req, res){
      console.log("Req Body: ", req.body);
      var temp = new forSale();
      temp.deleteListing(db, req, res);
    });

    // update information of the listed house for sale
    app.post("/updateForSale", function(req, res){
      console.log("Req Body: ", req.body);
      var temp = new forSale();
      temp.updateListing(db, req, res);
    });

    //get all the house listed for sale for a particular user based on user ID
    app.post('/users/:ID/forSaleListing', function (req, res) {
      console.log("Req Body: ", req.body);
      var temp = new individualUser();
      temp.forSaleListing(db, req, res);
    });

    //get all buyer application a particular user based on user ID
    app.post('/users/:ID/buyerApplication', function (req, res) {
      console.log("Req Body: ", req.body);
      var temp = new individualUser();
      temp.buyerApplication(db, req, res);
    });

    //Buy Request
    app.post("/buyRequest", buyRequest);

    // approve buyer application
    app.post('/approveBuy', function (req, res) {
      console.log("Req Body: ", req.body);
      var temp = new forSale();
      temp.approveBuy(db, req, res);
    });

    // reject buyer application
    app.post('/rejectBuy', function (req, res) {
      console.log("Req Body: ", req.body);
      var temp = new forSale();
      temp.rejectBuy(db, req, res);
    });

  


    // schedule visit for rental
    app.post("/visit", function(req, res){
      console.log("Req Body: ", req.body);
      var temp = new forRent();
      temp.visit(db, req, res);
    });

    // delete listed house for rent
    app.post("/deleteForRent", function(req, res){
      console.log("Req Body: ", req.body);
      var temp = new forRent();
      temp.deleteListing(db, req, res);
    });

    // update information of the listed house for rent
    app.post("/updateForRent", function(req, res){
      console.log("Req Body: ", req.body);
      var temp = new forRent();
      temp.updateListing(db, req, res);
    });

    //Rent Request
    app.post("/rentRequest", rentRequest);

    // approve renter application
    app.post('/approveRent', function (req, res) {
      console.log("Req Body: ", req.body);
      var temp = new forRent();
      temp.approveRent(db, req, res);
    });

    // reject renter application
    app.post('/rejectRent', function (req, res) {
      console.log("Req Body: ", req.body);
      var temp = new forRent();
      temp.rejectRent(db, req, res);
    });

    //get all the house listed for sale for a particular user based on user ID
    app.post('/users/:ID/forRentListing', function (req, res) {
      console.log("Req Body: ", req.body);
      var temp = new individualUser();
      temp.forRentListing(db, req, res);
    });

    //get all buyer application a particular user based on user ID
    app.post('/users/:ID/renterApplication', function (req, res) {
      console.log("Req Body: ", req.body);
      var temp = new individualUser();
      temp.renterApplication(db, req, res);
    });


//main search
  app.get('/api/search', async function (req, res) {
    try {
      const s = new search();
      const data = await s.begin(db, req);
      res.json({ success: true, ...data });
    } catch (ex) {
      res.json({ success: false, msg: ex.msg || ex.message || ex });
    }
  })
  // save favorite to database
  app.post('/api/favorite/home', async function (req, res) {
    try {
      const fav = new favorite();
      const data = await fav.homeAdd(db, req);
      res.json({ success: true, ...data });
    } catch (ex) {
      res.json({ success: false, msg: ex.msg || ex.message || ex });
    }
  })
  // delete favorite from database
  app.delete('/api/favorite/home', async function (req, res) {
    try {
      const fav = new favorite();
      const data = await fav.homeDelete(db, req);
      res.json({ success: true, ...data });
    } catch (ex) {
      res.json({ success: false, msg: ex.msg || ex.message || ex });
    }
  })
  // get favorite list
  app.get('/api/favorite/home', async function (req, res) {
    console.log("req",req.query);
    try {
      const fav = new favorite();
      const data = await fav.homeList(db, req);
      res.json({ success: true, ...data });
    } catch (ex) {
      res.json({ success: false, msg: ex.msg || ex.message || ex });
    }
  })

  // get favorite search list
  app.get('/api/favorite/search', async function (req, res) {
    try {
      const fav = new favorite();
      const data = await fav.searchList(db, req);
      res.json({ success: true, ...data });
    } catch (ex) {
      res.json({ success: false, msg: ex.msg || ex.message || ex });
    }
  })
  // get favorite search detail by id
  app.get('/api/favorite/search/:id', async function (req, res) {
    try {
      const fav = new favorite();
      const data = await fav.searchDetail(db, req);
      res.json({ success: true, ...data });
    } catch (ex) {
      res.json({ success: false, msg: ex.msg || ex.message || ex });
    }
  })
  // save favorite search to database
  app.post('/api/favorite/search', async function (req, res) {
    try {
      const fav = new favorite();
      const data = await fav.searchAdd(db, req);
      res.json({ success: true, ...data });
    } catch (ex) {
      res.json({ success: false, msg: ex.msg || ex.message || ex });
    }
  })
  // delete favorite search by condition
  app.delete('/api/favorite/search', async function (req, res) {
    try {
      const fav = new favorite();
      const data = await fav.searchDelete(db, req);
      res.json({ success: true, ...data });
    } catch (ex) {
      res.json({ success: false, msg: ex.msg || ex.message || ex });
    }
  })

  // search realtor list by name
app.get('/api/realtor/name', async function (req, res) {
  try {
    const s = new realtor();
    const { keyword } = req.query;
    const data = await s.searchByName(db, keyword);
    res.json({ success: data.list.length > 0 ? true : false, ...data });
  } catch (ex) {
    res.json({ success: false, msg: ex.msg || ex.message || ex });
  }
})

// search realtor list by zipcode
app.get('/api/realtor/zip', async function (req, res) {
  try {
    const s = new realtor();
    const { keyword } = req.query;
    const data = await s.searchByZip(db, keyword);
    res.json({ success: data.list.length > 0 ? true : false, ...data });
    console.log("data",data)
  } catch (ex) {
    res.json({ success: false, msg: ex.msg || ex.message || ex });
  }
})

app.get('/api/favorite/mine', async function (req, res) {
  try {
    const fav = new favorite();
    const data = await fav.getMySearchHistory(db, req);
    res.json({success: data.list.length > 0 ? true : false, ...data});
  } catch (ex) {
    res.json({success: false, msg: ex.msg || ex.message || ex});
  }
});
// add post search


app.post('/api/search', async function (req, res) {
  try {
    const s = new search();
    const data = await s.begin(db, req);
    res.json({success: true, ...data});
  } catch (ex) {
    res.json({success: false, msg: ex.msg || ex.message || ex});
  }
});

// set port, listen for requests
app.listen(9000, () => {
  console.log("Server is running on port 9000.");
});
