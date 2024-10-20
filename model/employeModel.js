const mongoose = require("mongoose");
const employeSchema = mongoose.Schema({

//Request body format:{name:'',location:'',position:'',salary:''}
name:String,
location:String,
position:String,
salary:Number




});

const employeModel = mongoose.model('employe',employeSchema);


module.exports = employeModel;




