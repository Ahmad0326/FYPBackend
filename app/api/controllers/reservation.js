const orderModel = require("../models/order");
const cartModel=require('../models/cart')

const createOrder = async (req, res, next) => {
  console.log("hloooooool")
    console.log("here to create an order",req.body)
  try {
    const { userId } = req.body;
    const order = new orderModel({ userId: userId, items: [] });
     
     console.log("here to create an order:3")
    
      let cart = await cartModel.findOne({ userId});
      console.log("Cart found : ", cart.items)
      if (!cart) {
        return  res.status(504).json({error:"Cart Doesn't exist"})
      }

      order.items.push(...cart.items)

    await order.save();


    cart.items = null;
    await cart.save();

    return res.json({
      status: "success",
      message: "Order created successfully!!!",
      data: { order },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create an order" });
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId; 
      const { status } = req.body;
      console.log("orderId :  ", orderId)  
    
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.json({
      status: "success",
      message: "Order updated successfully!!!",
      data: { order },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to update the order" });
  }
};

const getUserOrders = async (req, res, next) => {
  console.log("get all ORDERSSSSSSSSSS")
  try {
    const userId = req.params.userId;
    console.log("userId:",userId)
    
    const orders = await orderModel.find({ userId });
    console.log("orders: ", orders)
    const newOrderOnTop = orders.reverse()
    

    return res.json({
      status: "success",
      message: "User orders retrieved successfully!!!",
      data: { newOrderOnTop },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to retrieve user orders" });
  }
};

const getOrders = async (req, res, next) => {
  try {

    const orders = await orderModel.find();

    return res.json({
      status: "success",
      message: "All orders retrieved successfully!!!",
      data: { orders },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to retrieve all orders" });
  }
};




module.exports = {
  createOrder,
  updateOrderStatus,
  getUserOrders,
  getOrders
};