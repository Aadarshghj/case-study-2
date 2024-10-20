// Task1: initiate app and run server at 3000
const express = require("express");
const morgan = require("morgan")
// const EmployeRoute= require('./routes/EmployeeRoute');
require('dotenv').config();
const path=require('path');
// router.use(express.json());


const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

app.use(morgan("dev"));
// app.use('/api',EmployeRoute);


app.listen(process.env.port ,()=>{

    console.log(`Listening to port ${process.env.port }`)
})
// Task2: create mongoDB connection 
// require("./db/dbConnection");
const mongoose = require("mongoose")
require("dotenv").config();



mongoose.connect(process.env.mongo_url).then(
    ()=>{
        console.log("db connected");
    }
).catch(
(err)=>{
console.log(err);

}
);



//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


const employeModel = require("./model/employeModel")




//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async (req,res)=>{
    try {
        var data = await employeModel.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send("unable to find");
    }


})


//TODO: get single data from db  using api '/api/employeelist/:id'


app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await employeModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).send("Employee not found");
        }
        res.status(200).send(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).send("Error fetching employee");
    }
});



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async (req,res)=>{
    try {
        
        await new employeModel(req.body).save();
        res.status(200).send("Data added successfully")
    } catch (error) {
        res.status(400).send("unable to send data")
        
    }


});




//TODO: delete a employee data from db by using api '/api/employeelist/:id'


app.delete('/api/employeelist/:id',async(req,res)=> {

    try {
        console.log(req.params.id)
        await employeModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted Successfully")
    } catch (error) {
        res.status(404).send("unable to delete");
        
    }})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put("/api/employeelist/:id",async(req,res)=>{
    try {
        await employeModel.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send("updated successfully")
    } catch (error) {
        res.status(404).send("unable to update");
    }
    
    })
    
    

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



