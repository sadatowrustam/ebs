const { sendEmail } = require('./../../utils/email');
const catchAsync = require('../../utils/catchAsync');
const {Mails,Users}=require("../../models");
const AppError = require('../../utils/appError');
exports.sendMyMail = catchAsync(async (req, res) => {
  await sendEmail(req.body);
  const mail=await Mails.create(req.body)
  res.status(200).json({
    msg: 'Sizin hatynyz kabul edildi',
  });
});
exports.register=catchAsync(async(req,res,next)=>{
  const has=await Users.findOne({email:req.body.email})
  if (has) next(new AppError("User with this mail already exists"))
  const user=await Users.create(req.body)
  return user
})