"use strict";

var bcrypt = require('bcryptjs');

var con = require('../db.js');

var nodemailer = require('nodemailer'); //register route


exports.register = function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      name = _req$body.name,
      password = _req$body.password,
      mobile = _req$body.mobile,
      Confirmpassword = _req$body.Confirmpassword,
      verify = _req$body.verify,
      register_at = _req$body.register_at;

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
    });
    var mailOptions = {
      from: 'muhammadnawaz110002@gmail.com',
      to: email,
      subject: 'email verification',
      html: '<p>Welcome to StarShine plz verify your link <a href="http://localhost:3000/Verify-Email?id=' + id + '">Verify</a></p>'
    };
    mail.sendMail(mailOptions, function (err, info) {
      if (err) throw err;
    });
  }

  console.log(req.body);
  con.query('SELECT email,name FROM users WHERE email=? OR name=?', [email, name], function _callee(err, result) {
    var hashpassword;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!err) {
              _context.next = 2;
              break;
            }

            throw err;

          case 2:
            if (!(result.length > 0)) {
              _context.next = 7;
              break;
            }

            req.flash('message', 'user already exsits');
            return _context.abrupt("return", res.redirect('/register'));

          case 7:
            if (!(password != Confirmpassword)) {
              _context.next = 10;
              break;
            }

            req.flash('message', 'password does not match');
            return _context.abrupt("return", res.redirect('/register'));

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(bcrypt.hashSync(password, 8));

          case 12:
            hashpassword = _context.sent;
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
                  req.flash('message', 'Verification link has been sent Please Verify');
                  return res.redirect('/login');
                }
              });
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    });
  });
}; ///email verification set in routes.js 
///email verification set in routes.js
//# sourceMappingURL=authregister.dev.js.map
