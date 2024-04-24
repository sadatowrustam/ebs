const express = require('express');
const {
    getAllOrders,
    getOrderProducts,
    changeOrderStatus,
    deleteOrderProduct,
    // editProduct,
    deleteOrder,
    // hasabat,
    // giveCheck,
    // sendMessage,
    // allAdminMessages,
    // getAllNUmbers,
    // getOrdersByNumber,
    // sendToOneUser
} = require('../../../controllers/admin/ordersControllers.js');

const router = express.Router();

router.get('/', getAllOrders);
router.delete('/order-products/:id', deleteOrderProduct);
router.get('/:id', getOrderProducts);
// router.patch("/product/:id", editProduct)
router.post('/status/:id', changeOrderStatus);
router.delete("/:id", deleteOrder)
// router.get("/hasabat", hasabat)
// router.get("/all-phones", getAllNUmbers)
// router.get("/by-number", getOrdersByNumber)
// router.get("/check/:id/check", giveCheck)
// router.post("/send-message", sendMessage)
// router.get("/get-messages", allAdminMessages)
// router.post("/send-message/one", sendToOneUser)
module.exports = router;