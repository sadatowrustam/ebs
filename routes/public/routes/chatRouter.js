const express=require("express");
const router=express.Router()
const {Chat}=require("../../../models")
const {Op}=require("sequelize")
router.get("/:id",async(req,res)=>{
    let id=req.params.id
    try {
        const chat=await Chat.findOne({where:{user:id}})
        return res.send(chat)
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
})
module.exports=router
