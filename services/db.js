// Server - mongodb Integration

//1 import mongoose
const mongoose = require('mongoose');

//2) State connection String via mongoose 
mongoose.connect('mongodb://localhost:27017/BankServer',
{
    useNewUrlParser:true // to avoid unwanted warnings
});

//define bank db model

const User = mongoose.model('User',//model creation - User

{

    //Schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

//Export collection
module.exports = {
    User
}