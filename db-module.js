mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var registrationInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

var model = {
    RegistrationInfo : mongoose.model('RegistrationInfo', registrationInfoSchema)
};
module.exports = model;
