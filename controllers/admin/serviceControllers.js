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

exports.addService = catchAsync(async(req, res, next) => {
    const newBrand = await Services.create(req.body);
    console.log(req.body)
    await Images.update({serviceId:newBrand.id},{where:{id:{[Op.in]:req.body.images}}})
    return res.status(201).send(newBrand);
});
exports.getAllServices = catchAsync(async(req, res) => {
    const limit = req.query.limit || 20;
    const offset = req.query.offset;
    let { keyword } = req.query
    let order
    order = [
        ["createdAt", "DESC"]
    ]
    var keywordsArray = ["%%"]
    if (keyword && keyword != 'undefined') {
        keywordsArray = []
        keyword = keyword.toLowerCase();
        keywordsArray.push('%' + keyword + '%');
        keyword = '%' + capitalize(keyword) + '%';
        keywordsArray.push(keyword);
    }
    const data = await Services.findAll({
        limit,
        offset,
        order,
        where: {
            name_tm: {
                [Op.like]: {
                    [Op.any]: keywordsArray,
                },
            },
            name_ru: {
                [Op.like]: {
                    [Op.any]: keywordsArray,
                },
            },
            name_en: {
                [Op.like]: {
                    [Op.any]: keywordsArray,
                },
            },
        },
        include:{
            model:Images,
            as:"images"
        }
    });
    const count=await Services.count({where})
    return res.status(200).send({data,count});
});
exports.editService= catchAsync(async(req, res, next) => {
    const service = await Services.findOne({ where: { id: req.params.id } });
    if (!service)
        return next(new AppError('Service did not found with that ID', 404));

    const { name_tm } = req.body;
    if (
        typeof name_tm !== 'string' ||
        name_tm.length < 1
    )
        return next(new AppError('Invalid Credentials', 400));

    await service.update(req.body);
    await Images.update({serviceId:service.id},{where:{id:{[Op.in]:req.body.images}}})
    return res.status(200).send(service);
});

exports.deleteService = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const service = await Services.findOne({ where: { id } });

    if (!service)
        return next(new AppError('Service did not found with that ID', 404));

    if (service.image) {
        fs.unlink(`static/${service.image}`, function(err) {
            if (err) console.log(err);
        });
    }
    await service.destroy();
    return res.status(200).send('Successfully Deleted');
});
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
exports.getService = catchAsync(async(req, res, next) => {
    const data = await Services.findOne({ where: { id: req.params.id },include:{model:Images,as:"images"} })
    if (!data) return next(new AppError("Service not found with that id", 404))
    return res.status(200).send(data)
})
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};