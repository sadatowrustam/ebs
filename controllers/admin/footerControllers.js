const sharp = require('sharp');
const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {v4}=require("uuid")
const { Footer,Images } = require('../../models');
const { Op } = require('sequelize');
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.getAllBlogs=catchAsync(async(req,res,next)=>{
    let { keyword} = req.query;
    var where = {};
    if (keyword && keyword != "undefined") {
        let keywordsArray = [];
        keyword = keyword.toLowerCase();
        keywordsArray.push('%' + keyword + '%');
        keyword = '%' + capitalize(keyword) + '%';
        keywordsArray.push(keyword);
        where = {
            [Op.or]: [{
                    name_tm: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
                {
                    name_ru: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
                {
                    name_en: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
                {
                    body_tm: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
                {
                    body_ru: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
                {
                    body_en: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
            ],
        };
    }
    if(req.query.filter){
        const filter=JSON.parse(req.query.filter)
        const endDate=new Date(filter.endDate)
        const startDate=new Date(filter.startDate)
        if(filter.startDate!=undefined){
            where.createdAt = {
                [Op.gte]: startDate,
                [Op.lte]: endDate 
            }
        }
    }
    const limit=req.query.limit || 20
    const offset=req.query.offset || 0
    const data=await Footer.findAll({
        where,
        order:[["updatedAt","DESC"]],
        limit,
        offset,
        include:{
            model:Images,
            as:"images"
        }
    })
    const count=await Footer.count({where})
    return res.send({data,count})
})
exports.addBlogs=catchAsync(async(req,res,next)=>{
    console.log(req.body)
    const blogs=await Footer.create(req.body);
    await Images.update({footerId:blogs.id},{where:{id:{[Op.in]:req.body.images}}})
    return res.status(201).send(blogs)
})
exports.editBlogs=catchAsync(async(req,res,next)=>{
    const blogs=await Footer.findOne({where:{id:req.params.id}})
    if(!blogs) return next(new AppError("Footer not found",404))
    console.log(req.body)
    await blogs.update(req.body)
    if(req.body.images){
        await Images.update({footerId:blogs.id},{where:{id:{[Op.in]:req.body.images}}})
    }
    return res.send(blogs)
})
exports.deleteBlogs=catchAsync(async(req,res,next)=>{
    const blogs=await Footer.findOne({where:{id:req.params.id}})
    if(!blogs) return next(new AppError("Footer not found",404))
    await blogs.destroy()
    return res.send("Success")
})
exports.uploadImages=catchAsync(async(req,res,next)=>{
    req.files = Object.values(req.files)
    req.files = intoArray(req.files)
    for (const images of req.files) {
        const image_id = v4()
        var image = `${image_id}_brand.webp`;
        const photo = images.data
        let buffer = await sharp(photo).webp().toBuffer()
        await sharp(buffer).toFile(`static/${image}`);
        // await blogs.update({image})
    }
    return res.status(201).send(image);
})
exports.deleteImage=catchAsync(async(req,res,next)=>{
    const {image}=req.params
    fs.unlink(`static/${image}`,(err)=>{
        if(err) {
            console.log(err)
            return next(new AppError("Not deleted",400))
        }
        return res.send("Sucess")
    })
})
const intoArray = (file) => {
    if (file[0].length == undefined) return file
    else return file[0]
}