const nodemailer = require('nodemailer');

class SendEmail {
  async sendEmail(req, res) {
    console.log("Sending email");
    console.log(req.email);
    const transporter = nodemailer.createTransport({
      service: 'yahoo',
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true,
      auth: {
        user: 'test@yahoo.com',
        pass: '123456'
      }
    });

    const message = {
      from: 'test@yahoo.com',
      to: req.email,
      subject: req.title,
      text: req.emailContent,
    };

    try {
      await transporter.sendMail(message);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SendEmail;