// const sharp = require('sharp');
const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const sharp = require("sharp")
const { Banners, Products } = require('../../models');
const {v4}=require("uuid")
exports.getAllBanners=catchAsync(async(req,res)=>{
    const limit=req.query.limit ||20
    const offset=req.query.offset || 0
    const data=await Banners.findAll({limit,offset})
    const count=await Banners.count()
    return res.send({data,count})
})
exports.addBanner = catchAsync(async(req, res, next) => {
    const newBanner = await Banners.create(req.body);
    return res.status(201).send(newBanner);
});
exports.editBanner = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const banner = await Banners.findOne({ where: { id } });

    if (!banner)
        return next(new AppError('Banner did not found with that ID', 404));
    await banner.update(req.body)
    return res.status(200).send(banner)
})
exports.uploadImage = catchAsync(async(req, res, next) => {
    req.files = Object.values(req.files)
    const image = `${v4()}.webp`;
    const photo = req.files[0].data
    let buffer = await sharp(photo).webp().toBuffer()

    await sharp(buffer).toFile(`static/${image}`);
    return res.status(201).send(image);
});

exports.deleteBanner = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const banner = await Banners.findOne({ where: { id } });

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