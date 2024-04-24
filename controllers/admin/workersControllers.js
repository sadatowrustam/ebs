// const sharp = require('sharp');
const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const sharp = require("sharp")
const { Workers } = require('../../models');
const {v4}=require("uuid")
exports.addBanner = catchAsync(async(req, res, next) => {
    const newBanner = await Workers.create(req.body);
    return res.status(201).send(newBanner);
});
exports.editBanner = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const banner = await Workers.findOne({ where: { id } });

    if (!banner)
        return next(new AppError('Banner did not found with that ID', 404));
    await banner.update(req.body)
    return res.status(200).send(banner)
})

exports.deleteBanner = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const banner = await Workers.findOne({ where: { id } });

    if (!banner)
        return next(new AppError('Banner did not found with that ID', 404));

    if (banner.image) {
        fs.unlink(`static/${banner.image}.webp`, function(err) {
            if (err) console.log(err)
        });
    }

    await banner.destroy();

    return res.status(200).send('Successfully Deleted');
});