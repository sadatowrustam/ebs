const {
    Categories,
    Products,
    Subcategories,
    Images,
    Brands,
    Sizes,
    Colors
} = require('../../models');
const { Op } = require("sequelize")
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { getWhere } = require('../../utils/getWhere');
const include = [{
        model: Images,
        as: 'images',
        order: [
            ["updatedAt", "DESC"]
        ]
    },
    {
        model:Colors,
        as:"colors",
    },
    {
        model:Sizes,
        as:"sizes"
    }
]
exports.getAllCategories = catchAsync(async(req, res) => {
    let order = [
        ["order", "ASC"],
        ["updatedAt","DESC"]
    ]
    const categories = await Categories.findAll({
        order,
        include: {
            model: Subcategories,
            as: 'subcategories',
            order:["createdAt","DESC"]
        }
    });
    return res.status(200).send(categories);
});
exports.getCategoryProducts = catchAsync(async(req, res, next) => {
    const category = await Categories.findOne({
        where: { id: req.params.id },
    });
    if (!category)
        return next(new AppError('Category did not found with that ID', 404));
    const subcategories=await Subcategories.findAll({where:{categoryId:req.params.id}})
    const sizes=await Sizes.findAll({where:{categoryId:req.params.id}})
    const limit = req.query.limit || 20;
    const offset = req.query.offset;
    const { sort} = req.query;
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
    order.push(["colors","createdAt","DESC"])
    let product_where=getWhere(JSON.parse(req.query.filter))
    product_where.push({isActive:true})
    product_where.push({categoryId:category.id})
    console.log(product_where)
    const products = await Products.findAll({
        where:product_where,
        order,
        limit,
        offset,
        include
    });

    // const brands = await returnBrand(products)
    const count=await Products.count({where:product_where})
    // return res.status(200).send({ products, category_brands: brands });
    return res.status(200).send({ category,data:products,count,subcategories,sizes });

});
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
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