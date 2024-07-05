const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
    {
        username:{
            type : String,
            required : true,
            
        },
        email:{
            type: String,
            required : true,
            unique : true,
        },
        password:{
            type: String,
            required : true,
        }
    },
    {
        timestamps : true,
    }
);

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword,this.password);
    //  return bool
};

const User = mongoose.model("User",userSchema);

module.exports = User;