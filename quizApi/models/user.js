const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
   Name: String,
   mobile: Number,
   email: String,
   password: String,
   Quiz: [{
      quizid: {type: mongoose.SchemaTypes.ObjectId,
               ref: "quiz" },     
      result: { type: Array },
      attended:{ type:Number },
      markes: { type: Number }
   }]
});

module.exports = mongoose.model('user', user);
