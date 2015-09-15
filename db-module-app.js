var db = require('./db-module');

var registrationInfo = new db.RegistrationInfo({
    firstName:""+Math.random(),
    lastName:""+Math.random(),
    email:""+Math.random(),
    password:""+Math.random()
});

registrationInfo.save(function (err) {
    if (err){
        console.log('Error : '+err);
    }
    else{
        mongoose.disconnect()
    }
});
