//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Signature = require('./models/signature.js')
const app = express();
const url = process.env.MONGO_HOST;
//=========================//


app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*")
  next();
});

//====ROOT DIRECTORY===//
app.get('/', function(req, res) {
  res.json('you did it');
});
//==========================//

//====GET ALL SIGNATURES===//
app.get('/api/signatures', function(req, res) {
  Signature.find({}).then(eachOne => {
    res.json(eachOne);
    })
})
//==========================//

//====POST NEW SIGNATURE===//
app.post('/api/signatures', function(req, res) {
  console.log("@@@@@@@@@@@@@@@@", req)
    Signature.create({
      guestSignature: req.body.SignatureOfGuest,
      message: req.body.MessageofGuest,
    }).then(signature => {
      res.json(signature)
    });
});
//==========================//

//====MONGOOSE CONNECT===//
mongoose.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);
    }
});
//==========================//

app.listen(process.env.PORT || 3000);
console.log('starting applicaiton.  Good job!');