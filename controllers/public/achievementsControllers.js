const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Achievements} = require('../../models');

exports.getAllBanners = catchAsync(async(req, res) => {
    const limit = req.query.limit || 20;
    const offset = req.query.offset;
    const data = await Achievements.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        limit,
        offset,
    });
    const count=await Achievements.count()
    return res.status(200).send({data,count});
});

exports.getBanner = catchAsync(async(req, res, next) => {
    const banner = await Achievements.findOne({
        where: { id: req.params.id },
    });

    if (!banner)
        return next(new AppError('Achievement did not found with that ID', 404));

    return res.status(200).send(banner );
});