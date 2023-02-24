const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error")

exports.logout =(req, res) => {
    res.send({message:"logout user"});
};
exports.createUser = async (req, res, next)=>{
    if (!req.body?.userName) {
        return next(new ApiError(400, "userName can not be empty"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.createUser(req.body);
        return res.send(document); 
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};


exports.login = async (req, res, next)=>{
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findByUserName(req.body?.userName);
        
        if(!document[0]){
            return next(new ApiError(404, "Contact not found"));
        } 
        if(document[0].password != req.body?.password){
            return res.send("Password not right!")    
        }
        
        return res.send("login sucessfully");
        
    } catch (error){
        return next (
            new ApiError(500, `Error retrieving contact with id=${req.params.userName}`)
        );
    }
};
exports.deleteUser = async (req, res, next)=>{
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.deleteUser(req.body?.userName);
        if(!document){
            return next(new ApiError(404, "User not found"));
        } 
        return res.send({message: "User was deleted successfully"});       
    } catch (error){
        return next (
            new ApiError(500, `Could not delete User with id=${req.body?.userName}`)
        );
    }
};
