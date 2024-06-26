const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Categories, Subcategories, Products, Stock } = require('../../models');
const { Op, where } = require('sequelize');

exports.getAllSubcategories = catchAsync(async(req, res, next) => {
    let id = req.params.id
    const limit = req.query.limit || 20;
    const offset = req.query.offset;
    const sort = req.query
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
    const data = await Subcategories.findAll({
        limit,
        offset,
        order,
        where: {
            categoryId:id,
            name_tm: {
                [Op.like]: {
                    [Op.any]: keywordsArray,
                },
            },
        },
    });
    const count = await Subcategories.count({
        where: {
            categoryId:id,
            name_tm: {
                [Op.like]: {
                    [Op.any]: keywordsArray,
                },
            },
        },
    });
    console.log(data);
    return res.status(200).send({data,count});
})

exports.addSubcategory = catchAsync(async(req, res, next) => {
    const { categoryId, name_tm, name_ru,name_en } = req.body;
    console.log(req.body)
    const category = await Categories.findOne({
        where: { id:categoryId },
    })
    if (!category)
        return next(new AppError('Category did not found with that ID', 404));

    const newSubcategory = await Subcategories.create({
        categoryId: category.id,
        name_tm,
        name_ru,
        name_en 
    });
    return res.status(201).send(newSubcategory);
});

exports.editSubcategory = catchAsync(async(req, res, next) => {
    const { name_tm, name_ru,name_en } = req.body;

    const subcategory = await Subcategories.findOne({
        where: { id: req.params.id },
    });
    if (!subcategory)
        return next(new AppError('Sub-category did not found with that ID', 404));

    if (
        typeof name_tm !== 'string' ||
        name_tm.length < 1 ||
        typeof name_ru !== 'string' ||
        name_ru.length < 1
    )
        return next(new AppError('Invalid Credentials', 400));
    await subcategory.update({
        name_tm,
        name_ru,
        name_en
    });
    return res.status(200).send(subcategory);
});

exports.deleteSubcategory = catchAsync(async(req, res, next) => {
    const subcategory = await Subcategories.findOne({
        where: { id: req.params.id },
    });

    if (!subcategory)
        return next(new AppError('Sub-category did not found with that ID', 404));

    const products = await Products.findAll({
        where: { subcategoryId: subcategory.id },
    });

    if (products) {
        products.forEach(async(product) => {
            await product.destroy();
        });
    }
    await subcategory.destroy();
    return res.status(200).send('Successfully Deleted');
});
exports.getOne = catchAsync(async(req, res, next) => {
    let id = req.params.id
    let subcategory = await Subcategories.findOne({ where: { id } })
    console.log(subcategory)
    res.status(200).send(subcategory)
})
exports.searchSubcategory = catchAsync(async(req, res, next) => {
    const { keyword } = req.body
    let keywordsArray = [];
    keyword = keyword.toLowerCase();
    keywordsArray.push('%' + keyword + '%');
    keyword = '%' + capitalize(keyword) + '%';
    keywordsArray.push(keyword);
    let subcategories = await Subcategories.findAll({})
})
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};