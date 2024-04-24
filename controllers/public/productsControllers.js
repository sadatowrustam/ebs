const { Op } = require('sequelize');
const appError = require('../../utils/appError')
const {
    Products,
    Categories,
    Subcategories,
    Brands,
    Images,
    Colors,
    Sizes,
    Comments,
    Services
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { getWhere } = require('../../utils/getWhere');
exports.getProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 10;
    const { offset, sort} = req.query;
    var order, where=[];
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else order = [
        ['updatedAt', 'DESC']
    ];
    order.push(["images", "id", "DESC"])
    if(req.query.filter)
        where=getWhere(req.query.filter)
    const data = await Products.findAll({
        limit,
        offset,
        where,
        include: [{
                model: Images,
                as: "images"
            },
            {
                model:Colors,
                as:"colors"
            },
            {
                model:Sizes,
                as:"sizes"
            }
        ],
        order
    });
    
    // const brands = await returnBrand(products)
    return res.status(200).json({ data });
});
// Search
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.searchProducts = catchAsync(async(req, res, next) => {
    const limit = req.query.limit || 20;
    let { keyword, offset, sort } = req.query;
    var order;
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else order = [
        ['updatedAt', 'DESC']
    ];
    order.push(["images", "id", "DESC"])

    let keywordsArray = [];
    keyword = keyword.toLowerCase();
    keywordsArray.push('%' + keyword + '%');
    keyword = '%' + capitalize(keyword) + '%';
    keywordsArray.push(keyword);
    const products = await Products.findAll({
        where: {
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
            isActive: true,
        },
        include: {
            model: Images,
            as: "images"
        },
        order,
        limit,
        offset,
    });
    const service=await Services.findAll({
        where: {
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
            // isActive: true,
        },
        include: {
            model: Images,
            as: "images"
        },
        order,
        limit,
        offset,
    })
    return res.status(200).send({ products,service });
});
exports.getOneProduct = catchAsync(async(req, res, next) => {
    let id = req.params.id
    const oneProduct = await Products.findOne({
        where: { id },
        include: [
            {
                model: Categories,
                as: "category",
            },
            {
                model: Subcategories,
                as: "subcategory"
            },
            {
                model: Brands,
                as: "brand"
            },
            {
                model: Images,
                as: "images",
            },
            {
                model:Colors,
                as:"colors"
            },
            {
                model:Sizes,
                as:"sizes"
            }
        ],
        order: [
            ["images", "createdAt", "DESC"]
        ]
    })
    if (!oneProduct) {
        return next(new appError("Can't find product with that id"), 404);
    }
    id = oneProduct.categoryId
    const recommenendations=await Products.findAll(
        {
            where:{id:{[Op.ne]:oneProduct.id},categoryId:id},
            limit:4,
            include:[
                {
                    model:Images,
                    as:"images"
                },
                {
                    model:Colors,
                    as:"colors"
                }
                ]
        })
    const product = {
        oneProduct,
        recommenendations
    }
    return res.send(product)
})
exports.discount = catchAsync(async(req, res, next) => {
    const limit = req.query.limit || 20;
    const { offset, sort, brand_id } = req.query;
    let order, where;
    where = {
        isActive: true,
        discount: {
            [Op.ne]: 0
        },
    }
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else order = [
        ['updatedAt', 'DESC']
    ];
    order.push(["images", "id", "DESC"])

    if (brand_id != "undefined" && brand_id) {
        const brand = await Brands.findOne({ where: { brand_id } })
        where.brandId = brand.id
    }
    const discount_products = await Products.findAll({
        where,
        order,
        limit,
        offset,
        include: [
            {
            model: Images,
            as: "images",
            order: [
                ["images", "id", "DESC"]
            ]
        }]
    });
    const brands = await returnBrand(discount_products)
    return res.status(200).send({ discount_products, brands })
})
exports.setRating = catchAsync(async(req, res, next) => {
    const product = await Products.findOne({ where: { id: req.body.productId } })
    if (!product) {
        return next(new AppError("Product not found"), 404)
    }
    if(req.body.rating){
        rating = ((product.rating * product.rating_count) + req.body.rating) / (product.rating_count + 1)
        await product.update({ rating, rating_count: product.rating_count + 1 })
    }
    const comment= await Comments.create({...req.body})
    return res.status(200).send({ comment })
})
exports.getComments=catchAsync(async(req,res,next)=>{
    const offset=req.query.offset || 0
    const limit=req.query.limit || 10
    const data=await Comments.findAll({
        where:{
            productId:req.params.id
        },
        limit,
        offset,
        order:[["createdAt","DESC"]]
    })
    const count=await Comments.count({where:{productId:req.params.id}})
    return res.send({data,count})
})
exports.getColors=catchAsync(async(req,res,next)=>{
    const colors=await Colors.findAll({order:[["createdAt","DESC"]]})
    return res.send(colors)
})
async function returnBrand(products) {
    let ids = []
    for (let product of products) {
        ids.push(product.brandId)
    }
    const brands = await Brands.findAll({
        where: {
            id: {
                [Op.or]: ids
            },
        }
    })
    return brands
}