const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const quize = require('../models/quiz');
const checktoken = require('../middleware/check-auth');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var jwtDecode = require('jwt-decode');
var quiz;

//Register User
router.post('/register', (req, res, next) => {

    console.log(req.body);

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
        }
        //if a user was found, that means the user's email matches the entered email
        if (user) {
            var err = new Error('A user with that email has already registered. Please use a different email..')
            err.status = 400;
            return next(err);
        } else {
            var quizid = null;
            var result = [];
            var markes = null;
            var attended = null;
            let hash = bcrypt.hashSync(req.body.password, 10);
            //  console.log(hash);
            var user = new User({
                Name: req.body.Name,
                password: hash,
                email: req.body.email,
                mobile: req.body.mobile,
                Quiz: [{
                    quizid: quizid,
                    result: result,
                    markes: markes,
                    attended: attended,
                }]
            });

            user.save((err, user) => {
                if (!err) { res.send(user); }
                else { console.log('error with the Auth Save: ' + JSON.stringify(err, undefined, 2)); }
            });
        }
    });

});


//User Login
router.post('/login', (req, res, next) => {
    console.log(req.body);

    console.log(req.body);
    User.find({ email: req.body.email }).
        exec().
        then(user => {

            if (user.length < 1) {
                return res.json({
                    message: 'Auth failed'
                });
            }
            console.log(bcrypt.hashSync('poonam', 10));
            console.log(user[0].password);

            bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                if (err) {
                    return res.json({
                        message: 'Auth failed'
                    });
                }
                if (result) {

                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );

                    console.log(token);
                    return res.status(200).json({
                        message: 'Auth Successful',
                        data: result,
                        token: token
                    });
                }
                else {
                    res.json({
                        message: 'Auth failed',

                    });
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


//forget Password
router.post('/forgetPass', (req, res, next) => {
    User.findOne({ email: req.body.email }, function (err, auth) {
        if (err) {
            res.json({
                message: 'Auth failed',
            });
        }
        if (auth) {
            console.log(auth._id);
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                secure: false,
                host: "smtp.gmail.com",
                port: 587,

                auth: {
                    type: "login",
                    user: 'poonamshivatare@gmail.com',
                    pass: 'ouwrditnodqbgrqu'
                }
            });
            // console.log(auth.email);
            const encryptedString = cryptr.encrypt(auth._id);
            //    console.log(encryptedString);
            const mailOptions = {
                from: 'poonamshivatare@angularminds.in', // sender address
                to: auth.email, // list of receivers
                subject: 'Change Password', // Subject line
                text: 'To rest the password http://localhost:4200/resetPassword/' + encryptedString + ' click here'// plain text body
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    res.json({
                        message: 'email transfer failed',
                    });
                }
                else {
                    res.status(200).json({
                        message: 'email transfer Successful',
                        info: info
                    });
                }
            });
        } else {
            res.json({
                error: err,
                message: 'email transfer failed',
            });
            console.log('error with the Auth Save: ' + JSON.stringify(err, undefined, 2));
        }
    });
});



///reset Password
router.put('/resetPassword/:id', (req, res) => {
    // console.log(req.params.id);
    const decryptedString = cryptr.decrypt(req.params.id);
    //  console.log(decryptedString);
    let hash = bcrypt.hashSync(req.body.password, 10);
    var pass = {
        password: hash
    };

    User.findOneAndUpdate({ _id: decryptedString }, pass, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Employee update' + JSON.stringify(err, undefined, 2));
        }
    });
});

///change password
router.put('/changePassword', checktoken, (req, res, next) => {
    //  console.log(req.body, "***********", req.userData.userId);
    let hash = bcrypt.hashSync(req.body.password, 10);
    var pass = {
        password: hash
    };
    User.findOneAndUpdate({ _id: req.userData.userId }, pass, (error, res) => {
        if (res) {
            console.log('************', res);
        }
        else {
            console.log('************', error);
        }
    });

});

///User.find().select('Name email Quiz').then((respone) => {
//console.log(respone);
module.exports = router;