
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { OurWorks,Images} = require('../../models');

exports.getBlog=catchAsync(async(req,res,next)=>{
    const blogs=await OurWorks.findOne({where:{id:req.params.id},include:{model:Images,as:"images"}})
    if(!blogs) return next(new AppError("OurWorks not found",404))
    return res.send(blogs)
})
