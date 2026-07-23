const express=require("express");

const router=express.Router();

const verifyToken=require("../middleware/authMiddleware");

const noteController=require("../controllers/noteController");

router.post("/",verifyToken,noteController.create);

router.get("/",verifyToken,noteController.getAll);

router.put("/:id",verifyToken,noteController.update);

router.delete("/:id",verifyToken,noteController.delete);

module.exports=router;