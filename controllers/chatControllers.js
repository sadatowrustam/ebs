module.exports = (io) => {
    const { Chat, Admin } = require("../models")
    const nodemailer=require("nodemailer")
    let users = {}
    let adminOnline = false
    let adminSocket
    let isNewMessage = false
    const express = require("express");

    io.on('connection', async(socket) => {
        console.log("connected")
        socket.on('new-user', async(name) => {
            await Chat.create({ user: socket.id })
            users[socket.id] = socket.id
            socket.emit("new-user-login", { id: socket.id })
        })
        socket.on("login", async(socketId) => {
            users[socket.id] = socket.id
            let messages = await Chat.findOne({ where: { user: socketId } })
            if(!messages){
                messages=await Chat.create({user:socketId})
            }else {
                await Chat.update({ lastId: socket.id }, { where: { user: socketId } })
            }
            socket.emit("all-messages", { messages: messages.chat })
        })
        socket.on("admin-login", async() => {
            adminOnline = true
            adminSocket = socket.id
            if (isNewMessage) {
                socket.emit("new-messages")
                isNewMessage = false
            }
        })
        socket.on("admin-send", async(message) => {
            console.log(message)
            let id = message.id
            let lastMessage = message.text
            let messages = await Chat.findOne({ where: { id } })
            if (users[messages.lastId] != undefined) {
                socket.broadcast.to(messages.lastId).emit('admin-message', { lastMessage })
            }
            let allMessages = messages.chat
            let newMessage = {
                who: "admin",
                message: lastMessage
            }
            allMessages.push(newMessage)
            await Chat.update({ chat: allMessages }, { where: { id } })
            socket.emit("admin-success", {})
        })
        socket.on('send-chat-message', async(obj) => {
            let allMessages = []
            let messages = await Chat.findOne({ where: { user: obj.id } })
            obj.id = messages.id

            if (messages.chat != null) {
                allMessages = messages.chat
            }
            let newMessage = {
                who: "you",
                message: obj.message
            }
            allMessages.push(newMessage)
            if (adminOnline) {
                socket.broadcast.emit("chat-message", obj)
                isNewMessage = false
            }
            await Chat.update({ chat: allMessages, lastId: socket.id, isRead: "false" }, { where: { id: obj.id } })
            const admin = await Admin.findOne()
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                secure: true,
                auth: {
                    user: 'mailsendergeekspace@gmail.com',
                    pass: 'benaunwmmalcbmqc',
                },
            });
            const mailOptions = {
                from: `Contact-Us <mailsendergeekspace@gmail.com>`,
                to: admin.email,
                subject: 'Biri "EBS" administratsiýasy bilen habarlaşmak isleýär',
                text: `ADY: ${options.name},\n\n EMAIL: ${options.email}, \n TELEFON: ${options.phone},\nHATY: ${options.text}\ncity: ${options.city } `,
            };
            await transporter.sendMail(mailOptions);

        })
        socket.on('disconnect', () => {
            if (adminSocket == socket.id) {
                adminOnline = false
            }
            delete users[socket.id]
        })
    })
    return express
}
