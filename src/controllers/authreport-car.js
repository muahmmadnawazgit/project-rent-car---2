var con = require('../db.js');
const nodemailer = require('nodemailer');
//const mailGun = require('nodemailer-mailgun-transport');


exports.home = (req, res) => {
    const {
        email,
        subject,
        textarea
    } = req.body;
    con.query('SELECT * FROM users WHERE email=?', [email], function (err, result) {
        if (err) throw err;
        if (result.length <= 0) {
            req.flash('message', 'Please Enter Email you have register with');
            return res.redirect('/profile');
        } else {

            function sendEmail(email, subject, textarea) {
                var mail = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'muhammadnawaz110002@gmail.com',
                        pass: 'fdbtwhlfzoddxczn'
                    }
                })
                var mailOptions = {
                    from: email,
                    to: 'muhammadnawaz110002@gmail.com',
                    subject: subject,
                    text: textarea
                }
                mail.sendMail(mailOptions, function (err, info) {
                    if (err) throw err;
                })

            }
            sendEmail(email, subject, textarea, function () {
                if (err) throw err
            });
            /*
            const auth = {
                auth: {
                    api_key: 'e787c686c8a4c53464e3facc756488e0-48d7d97c-f8ad20e9',
                    domain: 'sandboxbdbb930070bc42bc9b8ef57f12f666c6.mailgun.org'
                }
            }


            const transporter = nodemailer.createTransport(mailGun(auth));

            const sendMail = (email, subject, textarea, cb) => {
                const mailOptions = {
                    from: email,
                    to: 'muhammadnawaz110002@gmail.com',
                    subject: subject,
                    text: textarea
                };
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        cb(err, null)
                    } else {
                        cb(null, data)
                    }
                })
            }

            sendMail(email, subject, textarea, function (err, data) {
                if (err) throw err;
            })*/
            req.flash('message', 'Email has Been Sent Succefully. We will Contact You Soon');
            return res.redirect('/profile')
        }
    })

}