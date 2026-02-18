const Register = require('../models/registerModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
    catch (error) {
        console.log(error);
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    }
    catch (error) {
        console.log(error);
    }
}

const registerNewUser = async (req, res) => {
    try {
        const { name, email, phone, password, answer, address } = req.body;
        //validation
        if (!name || !email || !phone || !password || !answer || !address)
            return res.status(400).send({ success: false, message: "All fields are required" });
        //check existing user
        const existingUser = await Register.findOne({ email });
        if (existingUser)
            return res.status(400).send({ success: false, message: "A user with this email is allready registered" });
        //creating user
        const hashedPassword = await hashPassword(password);
        const user = new Register({ name, email, phone, password: hashedPassword, answer, address });
        const newUser = await user.save();
        res.status(201).send({ success: true, message: "Register successfully", newUser });
    }
    catch (error) {
        console.error("Register Error:", error);
        res.status(500).send({ success: false, message: "Server Error: " + error.message });
    }
}

//login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send({ success: false, message: "All fields are required" });
        const user = await Register.findOne({ email });
        if (!user)
            return res.status(400).send({ success: false, message: "Incorrect login field" });
        const match = await comparePassword(password, user.password);
        if (!match)
            return res.status(400).send({ success: false, message: "Incorrect login field" });
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).send({ success: false, message: "Server Error: " + error.message });
    }
}

//Reset Password
const forgetController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email || !answer || !newPassword)
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        const user = await Register.findOne({ email });
        if (!user || !(user.answer === answer)) {
            return res.status(400).send({
                success: false,
                message: "Invalid input field"
            });
        }
        const hashed = await hashPassword(newPassword);
        const newUserPassword = await Register.findByIdAndUpdate({ _id: user._id }, { password: hashed });
        if (newUserPassword) {
            res.status(200).send({
                success: true,
                message: "Password reset successfully"
            });
        } else {
            res.status(401).send({ success: false, message: "Something went wrong" + newUserPassword });
        }
    }
    catch (error) {
        console.error("Forget Password Error:", error);
        res.status(500).send({
            success: false,
            message: "Server Error: " + error.message
        });
    }
}

//Check for token
const checkToken = async (req, res) => {
    try {
        res.status(200).send("Protected routes");
    }
    catch (error) {
        res.status(400).send("Invalid token:" + error);
    }
}

//Update User profile
const updateUserProfile = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !phone || !address)
            return res.status(400).send({ success: false, message: "All fields are required" });
        const user = await Register.updateOne({ email }, { name, phone, address });
        const updatedUser = await Register.findOne({ email });
        res.status(200).send({ success: true, message: "Profile Updated Successfully", updatedUser });
    }
    catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).send({ success: false, message: "Server Error: " + error.message });
    }
}

module.exports = { registerNewUser, loginUser, checkToken, forgetController, updateUserProfile };