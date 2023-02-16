var express = require('express');
var router = express.Router();
var con = require('./db.js');
var multer = require('multer');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

//const {} = require('pagesController.js');



//get home page
router.get('/home', function (req, res) {
    res.render('index', {
        style: 'index.css',
        message: req.flash('message')
    })
});

//submit route
router.get('/submit', function (req, res) {
    req.flash('message', 'Please logIn or Register First')
    return res.redirect('/home')
});

//get register page
router.get('/register', function (req, res) {
    res.render('register', {
        style: 'register.css',
        message: req.flash('message')
    })
});



//get login page
router.get('/login', function (req, res) {
    res.render('login', {
        style: 'login.css',
        message: req.flash('message'),
    })
});


//get login profile
router.get('/profile', function (req, res) {
    if (req.session.email) {
        res.render('home', {
            style: 'home.css',
            message: req.flash('message'),
            id: req.session.id
        })
    } else {
        req.flash('message', 'Session expired Please LogIn');
        return res.redirect('/login');
    }
})


//get Verify_email
router.get('/Verify-Email', function (req, res) {
    con.query(`SELECT * FROM users WHERE id='${req.query.id}'`, function (err, result) {
        if (err) throw err;
        if (result[0].verify == 1) {
            req.flash('message', 'user already verified');
            return res.redirect('/login');
        } else if (result[0].verify == 0) {
            con.query(`UPDATE users SET ? WHERE id='${req.query.id}'`, {
                verify: 1
            }, function (err, result) {
                if (err) throw err;
                req.flash('message', 'user  verified Please Login');
                return res.redirect('/login');
            })
        }
    })

})




//post route
router.post('/book-car', function (req, res) {
    const {
        location,
        pick,
        back,
        destination,
        city,
        mobile
    } = req.body;
    con.query('SELECT * FROM users WHERE mobile= ?', [mobile], function (err, result) {
        if (result.length <= 0) {
            req.flash('message', 'Please Update your Profile First');
            return res.redirect('/profile');
        } else {
            function sendEmail() {
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
                    from: result[0].email,
                    to: 'muhammadnawaz110002@gmail.com',
                    subject: ' Car Booking',
                    html: 'Destination: ' + destination + '<br>city: ' + city + '<br>pick: ' + pick + '<br>back: ' + back + '<br>location: ' + location + '<br>mobile: ' + mobile
                }
                mail.sendMail(mailOptions, function (err, info) {
                    if (err) throw err;
                })

            }
            sendEmail();
            /*
            const auth = {
                auth: {
                    api_key: 'e787c686c8a4c53464e3facc756488e0-48d7d97c-f8ad20e9',
                    domain: 'sandboxbdbb930070bc42bc9b8ef57f12f666c6.mailgun.org'
                }
            }

            var mail = nodemailer.createTransport(mailGun(auth));

            var mailOptions = {
                from: result[0].email,
                to: 'muhammadnawaz110002@gmail.com',
                subject: ' Car Booking',
                html: 'Destination: ' + destination + '<br>city: ' + city + '<br>pick: ' + pick + '<br>back: ' + back + '<br>location: ' + location + '<br>mobile: ' + mobile
            }

            mail.sendMail(mailOptions, function (err, info) {
                if (err) throw err;
            })*/
            req.flash('message', 'Booking sent Successfull , We will contact you soon');
            return res.redirect('/profile');
        }
    })

})

//multer file controller
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
})

const upload = multer({
    storage: storage
})

var multipleUploads = upload.fields([{
    name: 'fimage',
    maxCount: 1
}, {
    name: 'bimage',
    maxCount: 1
}])




//get update 
router.get('/updateProfile/:id', function (req, res) {
    if (req.params.id == req.session.id) {
        res.render('updateProfile', {
            style: 'update.css',
            message: req.flash('message'),
        })
    } else {
        req.flash('message', 'session expired Plz LogIn')
        return res.redirect('/login');
    }
});




/*poet update */
router.post('/update-Profolio',
    multipleUploads,
    function (req, res) {
        const {
            email,
            mobile,
        } = req.body;
        const fimage = req.files['fimage'][0].filename;
        const bimage = req.files['bimage'][0].filename;
        con.query('SELECT * FROM users WHERE email=?', [email], function (err, result) {
            if (result.length <= 0) {
                req.flash('message', 'Plz insert Email Registered with us.');
                return res.redirect('/updateProfile');
            } else {

                ///  console.log(`http://localhost:3000/uploads/${req.files['fimage'][0].filename}`);
                ////  console.log(req.files['bimage'][0].filename);
                con.query(`UPDATE users SET ? WHERE email='${req.body.email}'`, {
                    Mobile: mobile,
                    Fimage: fimage,
                    Bimage: bimage
                }, function (err, result) {
                    if (err) throw err;
                    req.flash('message', `updated Successfully!!`);
                    return res.redirect('/Profile');
                })
            }
        })
    }
);



router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
        else {
            return res.redirect('/login');
        }
    })


})
module.exports = router;