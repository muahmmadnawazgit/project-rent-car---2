"use strict";

var bcrypt = require('bcryptjs');

var con = require('../db.js');

exports.login = function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  con.query('SELECT * FROM users WHERE email=?', [email], function (err, result) {
    if (err) throw err;

    if (result.length <= 0) {
      req.flash('message', 'Invalid Email or Password');
      return res.redirect('/login');
    } else if (result.length && result[0].verify == 0) {
      req.flash('message', 'user not Verified please Verify');
      return res.redirect('/login');
    } else if (result.length && bcrypt.compareSync(password, result[0].password)) {
      req.session.email = email;
      req.session.id = result[0].id;
      req.flash('message', "Welcome '".concat(result[0].name, "'"));
      return res.redirect('/profile');
    }
  });
}; ///email verification set in routes.js 
///email verification set in routes.js
//# sourceMappingURL=authlogin.dev.js.map
