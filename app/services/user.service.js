const {ObjectId} = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("user");
    }

    extractConactData(payload) {
        const user ={
            userName: payload.userName,           
            password: payload.password,
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }
    async createUser(payload){
        const user = this.extractConactData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            {$set: {}},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }
    async find(filter){
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByUserName(userName) {
        return await this.find({
            userName: userName 
        });
    }
    async deleteUser(userName) {
        const result = await this.User.findOneAndDelete({
            userName: userName 
        });
        return result.value;
    }

}
module.exports = UserService;