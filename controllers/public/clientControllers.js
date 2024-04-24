const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Clients, Products } = require('../../models');

exports.getAllBanners = catchAsync(async(req, res) => {
    const limit = req.query.limit || 20;
    const offset = req.query.offset;
    const data = await Clients.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        limit,
        offset,
    });
    const count=await Clients.count()
    return res.status(200).send({data,count});
});

exports.getBanner = catchAsync(async(req, res, next) => {
    const banner = await Clients.findOne({
        where: { id: req.params.id },
    });

    if (!banner)
        return next(new AppError('Banner did not found with that ID', 404));

    return res.status(200).send(banner );
});