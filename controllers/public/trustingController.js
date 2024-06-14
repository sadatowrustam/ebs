
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Trusting,Images} = require('../../models');

exports.getBlog=catchAsync(async(req,res,next)=>{
    const blogs=await Trusting.findOne({where:{id:req.params.id},include:{model:Images,as:"images"}})
    if(!blogs) return next(new AppError("Trusting not found",404))
    console.log(blogs)
    return res.send(blogs)
})
