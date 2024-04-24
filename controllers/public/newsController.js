
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { News} = require('../../models');

exports.getBlog=catchAsync(async(req,res,next)=>{
    const blogs=await News.findOne({where:{id:req.params.id}})
    if(!blogs) return next(new AppError("News not found",404))
    return res.send(blogs)
})
