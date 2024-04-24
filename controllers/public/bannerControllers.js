const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Banners, Products } = require('../../models');

exports.getAllBanners = catchAsync(async(req, res) => {
    const data = await Banners.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
    });
    return res.status(200).send(data);
});

exports.getBanner = catchAsync(async(req, res, next) => {
    const banner = await Banners.findOne({
        where: { id: req.params.id },
    });

    if (!banner)
        return next(new AppError('Banner did not found with that ID', 404));

    return res.status(200).send(banner );
});