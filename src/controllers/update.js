var multer = require('multer');


exports.updateProfile = (req, res) => {
    console.log('here is the result');
  
    var Storage = multer.diskStorage({
        destination: function (req, res, cb) {
            cb(null, '../../uploads');
        },
        filename: function (req, file, cb) {
            cb(nul, Date.now() + file.originalname);
        }
    })
    req.flash('message', 'registeration Complete');
    return res.redirect('/updateProfile');
}