const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db.js');
const cors = require('cors');
const routes = require('./controller/adminController.js');
const userRoutes= require('./controller/userController.js');
const quizRouter =require('./controller/quizController.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200'}));
app.use('/admin', routes);
app.use('/user',userRoutes);
app.use('/quiz',quizRouter);

app.listen(process.env.port || 4000, function () {
    console.log('now listeing for request');
});































