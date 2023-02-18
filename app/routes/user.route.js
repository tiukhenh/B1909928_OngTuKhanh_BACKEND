const express = require("express");
const user = require("../controllers/user.controller");

const router = express.Router();

router.route("/")
    .post(user.createUser)
    .delete(user.deleteUser);

router.route("/login")
    .post(user.login);

router.route("/logout")
    .post(user.logout);
    
module.exports = router;