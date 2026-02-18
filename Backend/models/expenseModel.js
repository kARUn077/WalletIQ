const mongoose=require('mongoose');

const expenseSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50
    },
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        default:"Expense"
    },
    date:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    user_id:{
        type: String,
        ref: 'Register',
        required:true
    }
},{timestamps:true});

const Expenses=mongoose.model('Expense',expenseSchema);
module.exports=Expenses;