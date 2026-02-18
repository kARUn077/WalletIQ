const mongoose=require('mongoose');

const incomeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50
    },
    amount:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        default:"Income"
    },
    date:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        trim:true
    },
    description:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required:true
    }
},{timestamps:true});

const Incomes=mongoose.model('Income',incomeSchema);
module.exports=Incomes;