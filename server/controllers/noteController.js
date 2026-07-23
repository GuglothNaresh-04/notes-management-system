const noteModel = require("../models/noteModel");

exports.create = async(req,res)=>{
    const {title,content}=req.body;

    await noteModel.createNote(req.user.id,title,content);

    res.json({
        message:"Note Created"
    });
};

exports.getAll = async(req,res)=>{
    const notes=await noteModel.getNotes(req.user.id);

    res.json(notes);
};

exports.update = async(req,res)=>{
    const {title,content}=req.body;

    await noteModel.updateNote(
        req.params.id,
        req.user.id,
        title,
        content
    );

    res.json({
        message:"Note Updated"
    });
};

exports.delete=async(req,res)=>{

    await noteModel.deleteNote(
        req.params.id,
        req.user.id
    );

    res.json({
        message:"Note Deleted"
    });

};