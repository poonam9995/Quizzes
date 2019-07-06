const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const quiz = new Schema({

     title:String,
     description : String,
     Question:[{
          
           question:{type:String},
           option:{type:Array},
           correctAns:{type:String}
      }]
 });
 module.exports = mongoose.model('quiz',quiz);