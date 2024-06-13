const express = require('express');
const { sendMyMail } = require('../../controllers/public/contactusControllers');
const { getAboutus, sitemapXml } = require('../../controllers/admin/aboutUsController');
const router = express.Router();

router.post('/contact-us', sendMyMail);
router.get("/about-us",getAboutus)
router.get("/sitemap.xml",sitemapXml)
router.use('/banners', require('./routes/bannersRouter'));
router.use('/categories', require('./routes/categoriesRouter'));
router.use('/subcategories', require('./routes/subcategoriesRouter'));
router.use("/brands", require("./routes/brandsRouter"))
router.use('/products', require('./routes/productsRouter'));
router.use("/service-categories",require("./routes/servicecategoriesRouter"))
router.use("/service",require("./routes/serviceRouter"))
router.use("/news",require("./routes/newsRouter"))
router.use("/achievements",require("./routes/achievementsRouter"))
router.use("/orders", require("./routes/ordersRouter"))
router.use("/sellers",require("./routes/sellerRouter"))
router.use("/sizes",require("./routes/sizesRouter"))
router.use("/workers",require("./routes/workersRouter"))
router.use("/awards",require("./routes/awardsRouter"))
router.use("/clients",require("./routes/clientsRouter"))
router.use("/chat",require("./routes/chatRouter"))
router.use("/projects",require("./routes/projectsRouter"))
router.use("/trusting",require("./routes/trustingRouter"))
router.use("/our-works",require("./routes/ourWorksRouter"))
module.exports = router;