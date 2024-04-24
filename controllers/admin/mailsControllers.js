// const sharp = require('sharp');
const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Mails } = require('../../models');

exports.getAllMails=catchAsync(async(req,res,next)=>{
    const limit=req.query.limit || 10
    const offset=req.query.offset || 0
    const data=await Mails.findAll({
        order:[["createdAt","DESC"]],
        limit,
        offset
    })
    const count=await Mails.count()
    return res.send({data,count})
})
exports.getMail=catchAsync(async(req,res,next)=>{
    const mail=await Mails.findOne({where:{id:req.params.id}})
    return res.send(mail)
})
exports.deleteMail = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const banner = await Mails.findOne({ where: { id } });

    if (!banner)
        return next(new AppError('Banner did not found with that ID', 404));

    if (banner.image) {
        fs.unlink(`static/${banner.image}.webp`, function(err) {
            if (err) return next(new AppError(err, 500))
        });
    }

    await banner.destroy();

    return res.status(200).send('Successfully Deleted');
});