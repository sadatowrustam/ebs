const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Images, Projects } = require("../../models");

exports.getBlog = catchAsync(async (req, res, next) => {
  const blogs = await Projects.findOne({
    where: { id: req.params.id },
    include: { model: Images, as: "images" },
  });
  if (!blogs) return next(new AppError("Project not found", 404));
  return res.send(blogs);
});
