const express = require("express");
const {UserModel} = require("../models/user.model");
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const jwt = require("jsonwebtoken")

userRouter.post("/register",async(req,res) =>{
    const {username, email,pass} = req.body;
    try {
        bcrypt.hash(pass, 5, async(err, hash) =>{
            // Store hash in your password DB.
            if(err) {
              res.status(200).send({"error" : "Wrong credentials"})
            }else{
                const user = new UserModel({username,email,pass:hash});
                await user.save()
                res.status(200).send({"msg" : "New user is registered"})
            }
        });
    } catch (error) {
        res.status(400).send({"error" : error})
    }
});


userRouter.post("/login",async(req,res) =>{
    const {email,pass} = req.body;
    try {
        let user = await UserModel.findOne({email})
        bcrypt.compare(pass, user.pass, (err, result) => {
            // result == true
            if(result) {
                let token = jwt.sign({userID: user._id, username:user.username}, "masai");
                res.status(200).send({"msg" : "Login Successful", "token" : token})
            }else{              
                res.status(200).send({"msg" : "Wrong credentials"})
            }
        });
    } catch (error) {
        res.status(400).send({"error" : error})
    }
})

module.exports={
    userRouter
}