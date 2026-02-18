const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;