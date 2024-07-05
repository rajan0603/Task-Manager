const authservices = require("../services/authService");


const register = async (req,res) => {
    try{
        const user = await authservices.createUser(req.body);
        res.status(201).json({
            message : "user register successfully",
            userId: user._id,
        });
    } catch(error) {
        res.status(500).json({
            message:error.message
        });
    }
};

const login = async (req,res) => {
    try{
        const {token, userId} = await authservices.getUser(req.body);
        // if(!user){
        //     res.status(401).json({
        //         message: "user not found",
        //     })
        // }
        res.status(200).json({
            message: "login successfully",
            userId,
            token,
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}


module.exports = {register, login};