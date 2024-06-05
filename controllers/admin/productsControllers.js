const fs = require('fs');
const sharp = require('sharp');
const { v4 } = require("uuid")
const Op = require('sequelize').Op;
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const reader=require('xlsx');
var AdmZip = require("adm-zip");

const {
    Products,
    Categories,
    Brands,
    Images,
    Productcolor,
    Productsizes,
    Sizes,
    Colors,
    Subcategories
} = require('../../models');
const { where } = require('sequelize');
const resize = require('sharp/lib/resize');
const include = [{
    model: Images,
    as: "images",
    order: [
        ["id", "DESC"]
    ]
}];
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.getAllActiveProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 20;
    console.log(req.query)
    let { keyword, categoryId, isActive, offset } = req.query;
    let where = {}
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
            ],
        };
    }
    if (categoryId) where.categoryId = categoryId;
    const data = await Products.findAll({
        where,
        limit,
        offset,
        order: [
            ['createdAt', 'DESC']
        ],
        include
    });
    const count = await Products.count({where})
    return res.status(200).send({ data, count });
});
exports.addProduct = catchAsync(async(req, res, next) => {
    const category = await Categories.findOne({
        where: { id: req.body.categoryId },
    });
    const date = new Date()
    req.body.is_new_expire = date.getTime()
    if (!category)
        return next(new AppError('Category did not found with that ID', 404));
    // if (req.body.brandId) {
    //     const brand = await Brands.findOne({
    //         where: { brand_id: req.body.brand_id }
    //     })
    //     if (!brand)
    //         return next(new AppError("Brand did not found with that Id"), 404)
    //     req.body.brandId = brand.id
    // }
    if (req.body.discount > 0) {
        req.body.price_old = req.body.price;
        req.body.price =(req.body.price_old / 100) *(100 - req.body.discount);
    }
    req.body.categoryId = category.id;
    if(req.body.brandId=="") delete req.body.brandId
    if(req.body.subcategoryId == "") delete req.body.subcategoryId
    req.body.isActive = true
    req.body.sizeIds=req.body.sizes
    req.body.colorIds=req.body.colors
    const newProduct = await Products.create(req.body);
    await Images.update({productId:newProduct.id},{where:{id:{[Op.in]:req.body.images}}})
    for (const color of req.body.colors){
        await Productcolor.create({productId:newProduct.id,colorId:color})
    }
    for (const size of req.body.sizes){
        await Productsizes.create({productId:newProduct.id,sizeId:size})
    }
    return res.status(201).send(newProduct);
});
exports.getOneProduct = catchAsync(async(req, res, next) => {
    const { id } = req.params
    const oneProduct = await Products.findOne({
        where: { id },
        include: [{
                model: Images,
                as: "images"
            },
            {
                model: Categories,
                as: "category"
            },
            {
                model:Sizes,
                as:"sizes",
            },
            {
                model:Colors,
                as:"colors"
            },
            {
                model:Subcategories,
                as:"subcategory"
            },
            {
                model:Brands,
                as:"brand"
            }    
        ]
    })
    return res.send(oneProduct)
})
exports.addColor=catchAsync(async(req,res,next)=>{
    await Productcolor.destroy({where:{productId:req.body.id}})
    for (const color of req.body.colors){
        await Productcolor.create({productId:req.body.id,colorId:color})
    }
    return res.send(array)

})
exports.addSize=catchAsync(async(req,res,next)=>{
    await Productsizes.destroy({where:{productId:req.body.id}})
    await Products.findOne({where:{id:req.body.id}})
    const array=[]
    for (const size of req.body.sizes){
        const obj=await Productsizes.create({productId:req.body.id,sizeId:size})
        array.push(obj)
    }
    return res.send(array)
})
exports.editProduct = catchAsync(async(req, res, next) => {
    const product = await Products.findOne({
        where: { id: req.params.id },
    });
    if (!product)
        return next(new AppError('Product did not found with that ID', 404));
    if (req.body.discount > 0) {
        req.body.price_old = req.body.price;
        req.body.price =(req.body.price_old / 100) *(100 - req.body.discount);
    }
    await product.update(req.body);
    await Images.update({productId:product.id},{where:{id:{[Op.in]:req.body.images}}})
    await Productcolor.destroy({where:{productId:req.body.id}})
    for (const color of req.body.colors){
        await Productcolor.create({productId:product.id,colorId:color})
    }
    await Productsizes.destroy({where:{productId:product.id}})
    for (const size of req.body.sizes){
        await Productsizes.create({productId:product.id,sizeId:size})
    }
    return res.status(200).send(product);
});
exports.editProductStatus = catchAsync(async(req, res, next) => {
    const product = await Products.findOne({
        where: { product_id: req.params.id },
    });
    if (!product)
        return next(new AppError('Product did not found with that ID', 404));

    await product.update({
        isActive: req.body.isActive,
    });

    return res.status(200).send(product);
});

exports.deleteProduct = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const product = await Products.findOne({ where: { id } });
    if (!product)
        return next(new AppError('Product did not found with that ID', 404));

    const images = await Images.findAll({ where: { productId: product.id } })
    for (const image of images) {
        fs.unlink(`static/${image.image}`, function(err) {
            if (err) throw err;
        })
        await image.destroy()
    }
    await product.destroy();
    return res.status(200).send('Successfully Deleted');
});
exports.uploadProductImage = catchAsync(async(req, res, next) => {
    let images = []
    req.files = Object.values(req.files)
    req.files = intoArray(req.files)
    for (const one_image of req.files) {
        const id = v4()
        let image = `${id}`;
        const photo = one_image.data
        const buffer = await sharp(photo).webp().toBuffer()
        const buffer_small=await sharp(photo).webp().resize(500,500).toBuffer()
        const buffer_low=await sharp(photo).webp().resize(200,200).toBuffer()
        await sharp(buffer).toFile(`static/${image}.webp`);
        await sharp(buffer_small).toFile(`static/${image}_medium.webp`);
        await sharp(buffer_low).toFile(`static/${image}_low.webp`);
        image+=".webp"
        let newImage = await Images.create({ image, id })
        images.push(id)
    }
    return res.status(201).send(images);
});
exports.deleteProductImage = catchAsync(async(req, res, next) => {
    const image = await Images.findOne({ where: { id: req.params.id } })

    fs.unlink(`static/${image.image}`, function(err) {
        if (err) throw err;
    })
    await image.destroy()
    return res.status(200).send({ msg: "Sucess" })

})
const intoArray = (file) => {
    if (file[0].length == undefined) return file
    else return file[0]
}