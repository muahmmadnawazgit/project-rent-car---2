"use strict";

var multer = require('multer');

exports.updateProfile = function (req, res) {
  console.log('here is the result');
  var upload = multer({
    Storage: Storage
  });
  var Storage = multer.diskStorage({
    destination: function destination(req, res, cb) {
      cb(null, '../../uploads');
    },
    filename: function filename(req, file, cb) {
      cb(nul, Date.now() + file.originalname);
    }
  });
  req.flash('message', 'registeration Complete');
  return res.redirect('/updateProfile');
};
//# sourceMappingURL=update.dev.js.map
