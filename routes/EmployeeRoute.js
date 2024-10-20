const express = require("express");
const router= express.Router();
const employeModel = require("../model/employeModel")
router.use(express.json());

// post
router.post('/add',async (req,res)=>{
    try {
        
        await new employeModel(req.body).save();
        res.status(200).send("Data added successfully")
    } catch (error) {
        res.status(400).send("unable to send data")
        
    }


});


// get
router.get('/get',async (req,res)=>{
    try {
        var data = await employeModel.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send("unable to find");
    }


})

// delete

router.delete('/remove/:id',async(req,res)=> {

    try {
        console.log(req.params.id)
        await employeModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted Successfully")
    } catch (error) {
        res.status(404).send("unable to delete");
        
    }})
// update


router.put("/edit/:id",async(req,res)=>{
try {
    await employeModel.FindByIdAndUpdate(req.params.id,req.body);
    res.status(200).send("updated successfully")
} catch (error) {
    res.status(404).send("unable to update");
}

})





module.exports = router;
