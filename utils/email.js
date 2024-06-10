const nodemailer = require('nodemailer');
const { Admin } = require("../models")
exports.sendEmail = async(options) => {
    const admin = await Admin.findOne()
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: 'rustamsadatov0@gmail.com',
            pass: 'smvamzeedrfahnkj',
        },
    });
    const mailOptions = {
        from: `Contact-Us <rustamsadatov0@gmail.com>`,
        to: admin.email,
        subject: 'Biri "EBS" administratsiýasy bilen habarlaşmak isleýär',
        text: `ADY: ${options.name},\n\n EMAIL: ${options.email}, \n TELEFON: ${options.phone},\nHATY: ${options.text}\ncity: ${options.city } `,
    };
    await transporter.sendMail(mailOptions);
};
exports.orderNotification = async() => {
    const admin = await Admin.findOne()
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: 'rustamsadatov0@gmail.com',
            pass: 'smvamzeedrfahnkj',
        },
    });
    const mailOptions = {
        from: `<rustamsadatov0@gmail.com>`,
        to: "hydyrayhan7@gmail.com",
        subject: 'Taze zakaz geldi',
        text: `Taze zakaz geldi`,
    };
    await transporter.sendMail(mailOptions);
};
exports.adminWarning = async(options) => {
    const admin = await Admin.findOne()
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: 'rustamsadatov0@gmail.com',
            pass: 'smvamzeedrfahnkj',
        },
    });
    const mailOptions = {
        from: `<rustamsadatov0@gmail.com>`,
        to: admin.email,
        subject: 'Haryt barada duydurus',
        text: `${options.text}`,
    };
    await transporter.sendMail(mailOptions);
}
exports.sendPassword = async(options) => {
    const admin = await Admin.findOne()
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: 'rustamsadatov0@gmail.com',
            pass: 'smvamzeedrfahnkj',
        },
    });
    const mailOptions = {
        from: `Contact-Us <rustamsadatov0@gmail.com>`,
        to: admin.email,
        subject: 'Taze parol',
        text: `Taze parol ${options.new_password} \n Indi yadyndan cykarsan jaýyraryn`,
    };
    await transporter.sendMail(mailOptions);
};