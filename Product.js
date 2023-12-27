const mongoose = require('mongoose');
const Review = require('./Review');

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true,
        default:'/images/proj_dummy_img.avif'

    },
    price:{
        type:Number,
        min:0,
        default:null,
        required:true
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
},);



subjectSchema.post('findOneAndDelete' , async function(product){
    if(product.reviews.length > 0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})


let Product = mongoose.model('Product' , subjectSchema);
module.exports = Product;