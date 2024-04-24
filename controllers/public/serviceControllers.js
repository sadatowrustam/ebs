const sharp = require('sharp');
const fs = require('fs');
const { Op, where } = require('sequelize');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
    Services,
    Images,
    Comments
} = require('../../models');

exports.getService = catchAsync(async(req, res, next) => {
    const oneProduct = await Services.findOne({ where: { id: req.params.id },include:{model:Images,as:"images"} })
    if (!oneProduct) return next(new AppError("Service not found with that id", 404))
    const recommendations=await Services.findAll({where:{id:{[Op.ne]:oneProduct.id},servicecategoryId:req.params.id},include:{model:Images,as:"images"}})
    return res.status(200).send({oneProduct,recommendations})
})
exports.setRating = catchAsync(async(req, res, next) => {
    const service = await Services.findOne({ where: { id: req.body.serviceId } })
    if (!service) {
        return next(new AppError("Product not found"), 404)
    }
    if(req.body.rating){
        rating = ((service.rating * service.rating_count) + req.body.rating) / (service.rating_count + 1)
        await service.update({ rating, rating_count: service.rating_count + 1 })
    }
    const comment= await Comments.create({...req.body})
    return res.status(200).send({ comment })
})
exports.getComments=catchAsync(async(req,res,next)=>{
    const offset=req.query.offset || 0
    const limit=req.query.limit || 10
    const data=await Comments.findAll({
        where:{
            serviceId:req.params.id
        },
        limit,
        offset,
        order:[["createdAt","DESC"]]
    })
    const count=await Comments.count({where:{serviceId:req.params.id}})
    return res.send({data,count})
})