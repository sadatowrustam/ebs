// const sharp = require('sharp');
const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Comments,Services,Products } = require('../../models');

exports.getAllMails=catchAsync(async(req,res,next)=>{
    const limit=req.query.limit || 10
    const offset=req.query.offset || 0
    const {keyword}=req.query
    var keywordsArray = ["%%"]
    let where={}
    if (keyword && keyword != 'undefined') {
        keywordsArray = []
        keyword = keyword.toLowerCase();
        keywordsArray.push('%' + keyword + '%');
        keyword = '%' + capitalize(keyword) + '%';
        keywordsArray.push(keyword);
        where = {
            [Op.or]: [{
                    text: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
                {
                    username: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
            ],
        };
    }
    const data=await Comments.findAll({
        order:[["createdAt","DESC"]],
        limit,
        offset,
        include:[
            {
                model:Services,
                as:"service",
                attributes:["name_tm"]
            },
            {
                model:Products,
                as:"product",
                attributes:["name_tm"]
            }
        ]
    })
    const count=await Comments.count({where})
    return res.send({data,count})
})
exports.getMail=catchAsync(async(req,res,next)=>{
    const mail=await Comments.findOne({
        where:{id:req.params.id},
        include:[
            {
                model:Services,
                as:"service",
            },
            {
                model:Products,
                as:"product",
            }
        ]
    })
    return res.send(mail)
})
exports.deleteMail = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const banner = await Comments.findOne({ where: { id } });

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