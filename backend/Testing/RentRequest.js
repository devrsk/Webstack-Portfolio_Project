const rentRequest = (req, res, db, sendEmail) => {
  const renter_ID = req.body.renter_ID;
  const property_ID = req.body.property_ID;
  const credit_score = req.body.credit_score;
  const employer = req.body.employer;
  const annual_salary = req.body.annual_salary;
  const renter_name = req.body.renter_name;
  const request_status = 'P'; // Pending status
  const cols = [property_ID];

  db.query('SELECT "Owner_ID", "Realtor_ID", "pic_dir" FROM "FOR_RENT" WHERE "R_ID" = $1', cols, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        success: false
      });
      return;
    }

    const owner_ID = data[0].Owner_ID;
    const realtor_ID = data[0].Realtor_ID;
    console.log('owner ID', owner_ID);
    console.log('realtor ID', realtor_ID);
    const main_pic = `${data[0].pic_dir}/outside.png`;
    const col = [renter_ID, property_ID, owner_ID, renter_name, credit_score, employer, annual_salary, request_status, main_pic];

    db.query('INSERT INTO "RENTER_APPLICATION" VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', col, (err) => {
      if (err) {
        console.log(err);
        res.json({
          success: false
        });
        return;
      }
    });

    // Send email to owner
    let ownerEmail;
    let ownerUsername;
    let realtorEmail;
    let realtorUsername;
    let sql = '';
    let col2 = [];

    if (realtor_ID === undefined) {
      sql = 'SELECT "username", "Email" FROM "ACCOUNT" WHERE "ID" = $1';
      col2 = [owner_ID];
    } else {
      sql = 'SELECT "username", "Email" FROM "ACCOUNT" WHERE "ID" IN ($1, $2)';
      col2 = [owner_ID, realtor_ID];
    }

    console.log('sql: ', sql);
    console.log(col2);

    db.query(sql, col2, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          success: false
        });
        return;
      }

      // Send email to owner
      ownerUsername = data[0].username;
      ownerEmail = data[0].Email;
      let emailContent = `Hi ${ownerUsername},\n${renter_name} sent you a request to rent property ${property_ID}.`;
      emailContent += '\nPlease check your application list to approve/reject.';
      req.email = ownerEmail;
      req.title = 'Rent Request';
      req.emailContent = emailContent;
      const temp = new sendEmail();
      temp.sendEmail(req, res);

      // Send email to realtor
      if (data.length > 1) {
        console.log('Send to realtor');
        realtorUsername = data[1].username;
        realtorEmail = data[1].Email;
        emailContent = `Hi ${realtorUsername},\n${renter_name} sent you a request to rent property ${property_ID}.`;
        emailContent += '\nPlease check your application list to approve/reject.';
        req.email = realtorEmail;
        req.title = 'Rent Request';
        req.emailContent = emailContent;
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