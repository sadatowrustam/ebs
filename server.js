const express = require('express');
var cors = require('cors');
const AppError = require('./utils/appError');
const app = express();
const fileUpload = require("express-fileupload")
const { sequelize } = require("./models");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const limiter = require('express-rate-limit')({
    max: 1000,
    windowMs: 1000,
    message: 'Too many requests from this IP, please try again in an hour',
});
app.use(
    cors({
        origin: '*',
        'Cross-Origin-Resource-Policy:': 'same-site',
        'Cross-Origin-Resource-Policy': 'cross-origin'
    })
);
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "EBS",
			version: "1.0.0",
			description: "EBS API",
		},
		servers: [
			{
				url: "http://192.168.57.11:8000",
                // url: "http://192.168.1.120:8000"
			},
		],
	},
	apis: ["./docs/docs.yaml"],
    // apis: ["./docs/public.yaml"]
};
const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/public-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(require('morgan')('dev'));
app.use('/', limiter)
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: "50mb" }))
app.use(express.static(`${__dirname}/static`));
app.use('/api/admin', require('./routes/admin/adminRouter'));
app.use('/api/public', require('./routes/public/publicRouter'));
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(require('./controllers/errorController'));
app.use(require('./controllers/dateController'))
const PORT = 8000;
const server = app.listen(PORT, async() => {
    await sequelize.authenticate();
    console.log(`Connected to DB and listening on port ${PORT}...`);
});
const socket = require("socket.io")(server, { cors: { origin: "*" } })
app.use(require("./controllers/chatControllers")(socket))
app.set("socket.io", socket)
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});