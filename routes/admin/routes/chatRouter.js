const express=require("express");
const router=express.Router()
const {Chat}=require("../../../models")
const {Op}=require("sequelize")
router.get("/:id",async(req,res)=>{
    let id=req.params.id
    try {
        await Chat.update({isRead:"true"},{where:{id}})
        return res.send("Sucess")
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
})
router.get("/",async(req,res)=>{
    const limit=req.query.limit
    const offset=req.query.offset
    try {
        let chat = await Chat.findAll({order:[["updatedAt","DESC"]]},{where:{
            chat:{[Op.not]:null}},
            limit,
            offset
        }
        )
        const count=await Chat.count()
        return res.send({data:chat,count})
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
})
router.delete("/:id",async(req,res,next)=>{
    await Chat.destroy({where:{id:req.params.id}})
    return res.send("Sucess")

})
module.exports=router
