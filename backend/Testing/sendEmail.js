var nodemailer = require('nodemailer');
//const Mailgen = require("mailgen");

class sendEmail {



  sendEmail(req, res) {

    console.log("Sending email");
    console.log(req.email);
    let transporter = nodemailer.createTransport({
      service: 'yahoo',
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: false,
      auth: {
        user: 'example@example.com',
        pass: '123456'
      }
    });

    let message = {
      from: 'example@example.com',
      to: req.email,
      subject: req.title,
      text: req.emailContent,
    };

    transporter
      .sendMail(message)
      // .then(() => {
      //   res.json({
      //       success: true,
      //       msg: ''
      //       });
      // })
      .catch((error) => console.error(error));
  };


}


module.exports = sendEmail;