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

//Retrive QuizzesName

router.get('/quizzesName', checktoken, (req, res, next) => {
    quize.find((err, respone) => {
        if (respone) {
            res.status(201).json(respone);
           // console.log(respone);
        }
        else {
            console.log(err);
        }
    });
});

router.put('/sendQueziResult', checktoken, (req, res) => {
    // console.log(req.userData.userId );
      User.find({ _id : req.userData.userId },(err,res)=>{
           if(err)
          {
              console.log(err);
          }
          else{
              quiz= res[0].Quiz;
          }       
          var user = {
              quizid : req.body.id,
              result : req.body.result,
              markes : req.body.markes,
              attended:req.body.attended
             
          };
  
        // console.log(quiz); 
         quiz.push(user); 
       //  console.log("::::::::::::::",quiz);
         var result= {
             Quiz:quiz
          };
  
          console.log(result);
      User.findByIdAndUpdate({ _id: req.userData.userId }, result, (error, res1) => {
          if(error)
          {
              console.log(error);
          }
          if (res1) {
            // res.send(res1);
              console.log('************', res1);
          }
          else {
              console.log('************', error);
          }
      });
      });
     
     
  });

router.get('/getUser/:quiz', (req, res, next) => {
    console.log(req.params.quiz);
    User.find((err, respone) => {
        if (respone) {
            data=[];
           // console.log(respone[0]);
            //res.status(201).json(respone);
            for(var i=  0;i<respone.length;i++){
                var Quiz=respone[i].Quiz;
                for(var j = 1;j<Quiz.length;j++)
                {
                    if(Quiz[j].quizid.toString() == req.params.quiz )
                    {
                    console.log('name',respone[i].Name);
                    console.log('email',respone[i].email);
                    console.log('attends',Quiz[j].attended);
                    console.log('length',Quiz[j].result.length);
                    console.log('marks',Quiz[j].markes);
                    var quiz = {
                        id:Quiz[j].quizid,
                        name:respone[i].Name,
                        email:respone[i].email,
                        attends:Quiz[j].attended,
                        questionNo:Quiz[j].result.length,
                        marks:Quiz[j].markes,
                        result:Quiz[j].result,
                    }
                        data.push(quiz);
                }
                }
                //console.log('*****************',req.params.quiz);
               
                
            
            }
            res.send(data);
            console.log(data);
        }
        else {
            console.log(err);
        }
    });
});


// restrive Quez Object using Quez Id..
router.get('/questionName/:id', checktoken, (req, res, next) => {
    console.log(req.params.id);
    quize.find({ _id: req.params.id }, (err, respone) => {
        if (respone) {
            res.status(201).json(respone);
          //  console.log(respone);
        }
        else {
            console.log(err);
        }
    });
});



router.get('/',checkAuth,(req, res)=>{
    User.find({ _id : req.userData.userId },(result, err)=>{
     if(err){
         console.log(err);
     }
        if(result)
     {
        // console.log(result);
         res.status(201).json(result);
     }else{
         res.send(err)
     }
    });
    });


router.get('/quizzesName1', (req, res, next) => {
    quize.find((err, respone) => {
        if (respone) {
            res.status(201).json(respone);
           // console.log(respone);
        }
        else {
            console.log(err);
        }
    });
});

//delete Quizzes List

router.delete('/DeleteQuiz/:id',(req, res)=>{
    console.log(req.params.id);
    console.log(req.body);
  quize.findByIdAndDelete({_id: req.params.id},(res));

});
module.exports =  router;