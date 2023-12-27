const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    favSubject:{
        type:String,
        trim:true,
        // required:true
    },
    
    age:{
        type:Number,
        min:18,
        default:null,
        // required:true
    },
    collegeYear:{
        type:Number
    },
    teacherName:{
        type:String,
        trim:true,
        // required:true
    },
    
},);

let Student = mongoose.model('Student' , studentSchema);
module.exports = Student;