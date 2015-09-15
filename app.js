var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app     = express();
var expressValidator = require('express-validator');
var db = require('./db-module');

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());  //required for Express-Validator

app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('registration.html',{ errors:"" });
});

app.post('/registration', function(req, res) {

    req.assert('firstName', 'First name is required').notEmpty();
    req.assert('lastName', 'Last name is required').notEmpty();
    req.assert('email', 'A valid email is required').isEmail();
    req.assert('password', 'Password is required').notEmpty();
    req.assert('repeatPassword', 'Please retype password').notEmpty();
    req.assert('repeatPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if(!errors){
        var registrationInfo = new db.RegistrationInfo({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password
        });

        registrationInfo.save(function (err) {
            if (err){
                console.log('Error : '+err);
            }
        });
        res.render('details.html',
            {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : req.body.password,
                repeatPassword : req.body.repeatPassword
            }
        );

    }else {
        res.render('registration.html',
            {
                errors : errors
            }
        );
    }
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});
