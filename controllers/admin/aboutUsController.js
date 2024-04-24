const catchAsync = require('../../utils/catchAsync');
const { Aboutus} = require('../../models');

exports.getAboutus = catchAsync(async(req, res) => {
    const data = await Aboutus.findOne();
    return res.status(200).send(data);
});
exports.editAboutus = catchAsync(async(req, res) => {
 const data = await Aboutus.findOne();
 await data.update(req.body)
 return res.status(200).send(data);
});
