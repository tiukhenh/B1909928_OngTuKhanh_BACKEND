exports.createUser =(req, res) => {
    res.send({message:"create user"});
};
exports.login =(req, res) => {
    res.send({message:"login user"});
};
exports.deleteUser = (req, res) =>{
    res.send({message:"delete user"});
};
exports.logout =(req, res) => {
    res.send({message:"logout user"});
};