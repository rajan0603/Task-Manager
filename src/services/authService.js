const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (userData) => {
    try{
        const existingUser = await User.findOne({email:userData.email});
        if(existingUser){
            throw new Error("user already existing")
        }
        const user = new User(userData);

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userData.password, salt);
        user.password = hashPassword;

        await user.save();
        return user;
    }
    catch(error){
        throw error;
    }
};';'

const getUser = async (userInfo) => {
    try{
        const {email, password} = userInfo;
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("user does not found");
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            throw new Error("invalid credential");
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        console.log(token);
        
        return {token,user};

    } 
    catch(err){
        throw err;
    }
};

module.exports = { createUser, getUser };