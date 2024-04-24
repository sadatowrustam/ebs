const { Products, Subcategories, Sizes, Images,Colors } = require('../../models');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {getWhere}=require("../../utils/getWhere")
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
exports.getSubcategoryProducts = catchAsync(async(req, res, next) => {
    const subcategory = await Subcategories.findOne({
        where: { id: req.params.id },
    });
    if (!subcategory)
        return next(new AppError('Sub-category did not found with that ID', 404));
    const limit = req.query.limit || 20;
    const offset = req.query.offset;
    const sort = req.query.sort;
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
    const sizes=await Sizes.findAll({where:{categoryId:subcategory.categoryId}})
    // const where= { subcategoryId: subcategory.id, isActive: true }
    let product_where=getWhere(JSON.parse(req.query.filter))
    product_where.push({isActive:true})
    product_where.push({subcategoryId:subcategory.id})
    console.log(product_where)
    const data = await Products.findAll({
        where:product_where,
        order,
        limit,
        offset,
        include
    });
    const count=await Products.count({where:product_where})
    return res.status(200).send({ data,sizes,count,subcategory });
});
