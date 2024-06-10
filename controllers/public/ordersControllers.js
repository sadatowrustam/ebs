const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Products, Orders, Orderproducts, Services } = require('../../models');
const { adminWarning, orderNotification } = require("../../utils/email")
const randomstring = require("randomstring");
exports.addMyOrders = catchAsync(async(req, res, next) => {
    var {
        order_products,
        user_phone,
        note,
        user_name,
        address,
        mail
    } = req.body;
    let status = "Garashylyar"
    let checkedProducts = [];
    let total_price = 0;
    let total_quantity = 0;
    let other_details=[]
    let isRegistered=false
    if (order_products)
        for (var i = 0; i < order_products.length; i++) {
            let product
            let data={}
            if(order_products[i].type=="service"){
                product=await Services.findOne({where:{id:order_products[i].serviceId}})
                data.serviceId=product.id
            }else{
                product = await Products.findOne({
                    where: { id: order_products[i].productId }
                });
            }
            if (!product)
                return next(
                    new AppError(
                        `Product did not found with your ID index: ${i + 1}`,
                        404
                    )
                );
            if(order_products[i].colorId!=null){
                data.colorId=order_products[i].colorId
            }
            if(order_products[i].sizeId!=null){
                data.sizeId=order_products[i].sizeId
            }
            data.image=order_products[i].image
            other_details.push(data)
            total_quantity = total_quantity + Number(order_products[i].quantity);
            checkedProducts.push(product);
            total_price =
                total_price + product.price * Number(order_products[i].quantity);
        }
    if (mail) isRegistered=true
    const order = await Orders.create({
        total_price,
        user_phone,
        note,
        status,
        total_quantity,
        user_name,
        address,
        isRegistered
    });
    for (var i = 0; i < checkedProducts.length; i++) {
        const order_product=await Orderproducts.create({
            orderId: order.id,
            productId: order_products[i].productId,
            quantity: order_products[i].quantity,
            price: checkedProducts[i].price,
            image:checkedProducts[i].image,
            total_price: Number(
                checkedProducts[i].price * order_products[i].quantity
            ),
            type:order_products[i].type,
            ...other_details[i],
        });
    }
    const socket = req.app.get("socket.io")
    socket.emit("admin-order")
    return res.status(200).send(order)
});
exports.check_phone = catchAsync(async(req, res, next) => {
    if (req.body.check_phone) {
        const order = await Orders.findOne({ where: { user_phone: req.body.check_phone } })
        if (order) return res.status(200).send({ status: 1 })
        const socket = req.app.get("socket.io")
        const number = randomstring.generate({
            charset: "numeric",
            length: 6
        })
        let obj = {
            text: "Tassyklayys kodunyz " + number,
            number: req.body.check_phone
        }
        socket.emit("verification-phone", obj)
        return res.status(200).send({ status: 0, code: number })
    } else next()
})