const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
    Brands,
    Products,
    Categories,
    Images,
    Stock,
} = require('../../models');
const { Op } = require("sequelize")
exports.getAllBrands = catchAsync(async(req, res) => {

    const data = await Brands.findAll({
        order: [
            ["updatedAt", "DESC"]
        ],
    });
    const count=await Brands.count()
    return res.status(200).send({data,count});
});

exports.getBrandProducts = catchAsync(async(req, res, next) => {
    const brand = await Brands.findOne({ where: { id: req.params.id } });
    if (!brand)
        return next(new AppError('Brand did not found with that ID', 404));
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

    const products = await Products.findAll({
        where: { brandId: brand.id, isActive: true },
        order,
        limit,
        offset,
        include: [
            {
                model: Images,
                as: "images",
                order: [
                    ["updatedAt", "DESC"]
                ]
            }
        ],
    });

    return res.status(200).send({brand,products});
});
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};