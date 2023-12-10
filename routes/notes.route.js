const express = require("express");
const {NoteModel} = require("../models/note.model");
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");
const {auth} = require("../middleware/auth.middleware")

noteRouter.post("/create",auth,async(req,res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).send({"msg" : "New note is created"})
        
    } catch (error) {
        res.status(400).send({"Error" : error})
    }
});

noteRouter.get("/get",auth,async(req,res) => {
    try {
        const notes = await NoteModel.find({userID: req.body.userID});
        res.status(200).send({"Notes" : notes})
        
    } catch (error) {
        res.status(400).send({"Error" : error})
    }
});


noteRouter.patch("/update/:id",auth,async(req,res) => {
    const {id} = req.params
    try {
        let note = await NoteModel.findOne({_id: id});
        if(req.body.userID === note.userID) {
            await NoteModel.findByIdAndUpdate({_id:id}, req.body);
            res.status(200).send({"msg" : `Note with id ${id} is updated`});
        }else{

            res.status(200).send({"msg" : "You are not authorised"})
        }
        
    } catch (error) {
        res.status(400).send({"Error" : error})
    }
});
noteRouter.delete("/delete/:id",auth,async(req,res) => {
    const {id} = req.params
    try {
        let note = await NoteModel.findOne({_id: id});
        if(req.body.userID === note.userID) {
            await NoteModel.findByIdAndUpdate({_id:id});
            res.status(200).send({"msg" : `Note with id ${id} is Deleted`});
        }else{

            res.status(200).send({"msg" : "You are not authorised"})
        }
        
    } catch (error) {
        res.status(400).send({"Error" : error})
    }
});


module.exports = {
    noteRouter
}