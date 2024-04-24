const fs = require('fs');
const { Op, where } = require('sequelize');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
    Servicecategory,
    Services,
    Images
} = require('../../models');

exports.getAllCategories = catchAsync(async(req, res, next) => {
    let order
    order = [
        ["createdAt", "DESC"]
    ]
    const data = await Servicecategory.findAll({
        order
    });
    return res.status(200).send(data);
})
exports.getOneCategory = catchAsync(async(req, res, next) => {
    let { id } = req.params
    const category = await Servicecategory.findOne({
        where: { id },
    });
    const data=await Services.findAll({where:{servicecategoryId:id},include:{model:Images,as:"images"}})
    if (!category) {
        return next(new AppError("Category not found with that id", 404))
    }
    const count=await Services.count({where:{servicecategoryId:id}})
    return res.status(200).send({data,category,count})
})

const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};