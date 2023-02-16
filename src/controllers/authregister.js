var bcrypt = require('bcryptjs');
var con = require('../db.js');
var nodemailer = require('nodemailer');



//register route
exports.register = (req, res) => {
  const {
    email,
    name,
    password,
    mobile,
    Confirmpassword,
    verify,
    register_at
  } = req.body

  function sendEmail(email, id) {
    var email = email;
    var id = id;
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
      from: 'muhammadnawaz110002@gmail.com',
      to: email,
      subject: 'email verification',
      html: '<p>Welcome to StarShine plz verify your link <a href="http://localhost:3000/Verify-Email?id=' + id + '">Verify</a></p>'
    }
    mail.sendMail(mailOptions, function (err, info) {
      if (err) throw err;
    })

  }
  console.log(req.body);
  con.query('SELECT email,name FROM users WHERE email=? OR name=?', [email, name], async function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      req.flash('message', 'user already exsits');
      return res.redirect('/register')
    } else if (password != Confirmpassword) {
      req.flash('message', 'password does not match');
      return res.redirect('/register')
    }
    const hashpassword = await bcrypt.hashSync(password, 8);
    con.query('INSERT INTO users SET ?', {
      name: name,
      password: hashpassword,
      email: email,
      verify: 0
    }, function (err, result) {
      if (err) throw err;
      con.query('SELECT * FROM users WHERE email=?', [email], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          sendEmail(email, result[0].id);
          req.flash('message', 'Verification link has been sent Please Verify')
          return res.redirect('/login');
        }
      })

    })
  })
};

///email verification set in routes.js 
///email verification set in routes.js 