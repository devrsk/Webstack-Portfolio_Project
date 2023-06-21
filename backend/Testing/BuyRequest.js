const nodemailer = require('nodemailer');
const sendEmail = require('./sendEmail');
const db = require('./db.js');


const buyRequest = (req, res) => {
    // const { userEmail, name, offer} = req.body;
    
    buyer_id = req.body.ID;
    property_id = req.body.S_ID;
    buyer_name = req.body.name;
    offer_price = req.body.offer;
    offer_status = 'P'  // pending status

    const cols = [property_id];
    db.query('SELECT Owner_ID, Realtor_ID, pic_dir from FOR_SALE where S_ID = ?', cols, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                success: false
            });
            return;
        }

        const owner_id = data[0].Owner_id;
        const realtor_id = data[0].Realtor_id;
        const main_pic = data[0].pic_dir + "/outside.png";

        const cols = [buyer_id, property_id, owner_id, buyer_name, offer_price, offer_status, main_pic];
        db.query('INSERT INTO BUYER_APPLICATION VALUES (?,?,?,?,?,?,?)', cols, (err) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false
                });
                return;
            }

            // send email to owner
            const owner_username = data[0].username;
            const owner_email = data[0].Email;
            const email_content = `Hi ${owner_username},

            ${buyer_name} sent you an offer of ${offer_price} for property ${property_id}.

            Please check your application list to approve/reject.`;
            sendEmail(owner_email, 'Buy Request', email_content);

            // send email to realtor
            if (realtor_id) {
                const realtor_username = data[1].username;
                const realtor_email = data[1].Email;
                const email_content = `Hi ${realtor_username},

            ${buyer_name} sent you an offer of ${offer_price} for property ${property_id}.

            Please check your application list to approve/reject.`;
                sendEmail(realtor_email, 'Buy Request', email_content);
            }

            res.json({
                success: true,
                msg: ''
            });
        });
    });
};


module.exports = buyRequest;
