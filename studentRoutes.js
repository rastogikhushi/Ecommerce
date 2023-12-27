const express =  require('express');
// const Joi = require('joi');
const Student = require('../models/Student');
const router = express.Router();


router.get('/students' , async(req,res)=>{
    try{
        let students = await Student.find({});
        res.render('students/show' , {students});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
    
})
router.get('/students/new' , (req,res)=>{
    try{
        res.render('students/new');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})
router.get('/students/show' , (req,res)=>{
    try{
        res.render('students/show');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})
router.post('/students', async (req,res)=>{
        let {favSubject,age,collegeYear,teaherName} = req.body;

        await Student.create({favSubject,age,collegeYear,teaherName});
        req.flash('success' , 'Student added successfully');
        res.redirect('/students');
})
router.get('/students/:id' , async(req,res)=>{
    try{

        let {id} = req.params;
        let foundStudent = await Student.findById(id);

        res.render('students/show' , {foundStudent , msg:req.flash('msg')});
    }

    catch(e){
        res.status(500).render('error' , {err:e.message});
    }

})
router.get('/students/:id/edit' , async(req,res)=>{
    try{

        let {id} = req.params;
        let foundStudent = await Product.findById(id);
        res.render('students/edit' , {foundStudent});
        
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// changing the original edits in the database made in the editform 
router.patch('/students/:id',  async(req,res)=>{
    try{

        let {id} = req.params;
        let {favSubject,age,collegeName,collegeYear} = req.body;
        await Student.findByIdAndUpdate(id , {favSubject,age,collegeName,collegeYear});
        req.flash('success' , 'Student edited successfully');
        res.redirect(`/students/${id}`)
    }

    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})
module.exports = router;