
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Awards} = require('../../models');

exports.getBlog=catchAsync(async(req,res,next)=>{
    const blogs=await Awards.findOne({where:{id:req.params.id}})
    if(!blogs) return next(new AppError("Award not found",404))
    return res.send(blogs)
})
