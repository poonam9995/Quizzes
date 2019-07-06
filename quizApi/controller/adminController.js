const express = require('express');
const router = express.Router();

const admin = require('../models/admin');
const quiz = require('../models/quiz');

router.post('/admin', (req, res, next) => {
    console.log(req.body.admin_Id, req.body.password);
    admin.find({ admin_Id: req.body.admin_Id }).exec().then((obj, err) => {
        if (err) {
            res.json({
                message: 'Auth failed'
            });
        }
        if(obj) {
            console.log(obj[0]);
            if(obj[0] != undefined){
            if (obj[0].password === req.body.password) {
                res.json({
                    message: 'Auth Success',
                    obj: obj
                });
            }
            else {
                res.json({
                    message: 'Password is Wrong'
                });
            }
        }
        else {
            res.json({
                message: 'AdminId is Wrong'
            });
        }
        }
        else
        {
            res.json({
                message:'Auth failed'
            });
        }

    });



    //     console.log(a);
    //     a.save((error, result) => {
    //         if (error) {
    //             res.send({
    //                 massage:'Auth failed',
    //                });
    //         }
    //         else {
    //             res.send({
    //                 massage:'Auth Success',
    //                 data:result
    //             });
    //         }
    //     });
});

router.post('/quiz', (req, res, next) => {
    // console.log(req.body.Question[0].option);
    var question2 = [];

    for (var i = 0; i < req.body.Question.length; i++) {
        console.log(req.body.Question[i].question);
        question2[i] = {
            question: req.body.Question[i].question,
            correctAns: req.body.Question[i].correctAns,
            option: req.body.Question[i].option
        }
    }
    console.log(question2);
    var q = new quiz({
        title: req.body.title,
        description: req.body.description,
        Question: question2,
    });

    console.log(q);
    q.save((error, response) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
});

module.exports = router;