const express = require("express");
const admin = require('../middlewares/admin');
const {Product} = require('../models/product');
const Order = require('../models/order');
const adminRouter = express.Router();


//** ------------------------------- ADD PRODUCT ------------------------- */

adminRouter.post('/admin/add-product', admin, async(req, res) => {
    try {
        const {name, description, images, quantity, price, category} = req.body;
        let product = new Product ({
            name, description, images, quantity, price, category
        });
        product = await product.save();
        res.json(product);

    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

//** ------------------------------- GET ALL PRODUCTS ------------------------- */

adminRouter.get('/admin/get-products', admin, async(req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (er) {
        res.status(500).json({error: er.message});
    }
});

//** ------------------------------- DELETE PRODUCT ------------------------- */

adminRouter.post('/admin/delete-product', admin, async(req, res) =>{
    try {
        const {id} = req.body;
        let product = await Product.findByIdAndDelete(id);
        res.json(product);
        
    } catch (er) {
        res.status(500).json({error: er.message})
    }
});

//* --------------------------------------Get All Orders -------------------------- *//

adminRouter.get('/admin/get-all-orders', admin, async(req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (er) {
        res.status(500).json({error: er.message});        
    }
});

//* ----------------------------------- CHANGE ORDER STATUS ------------------------- *//

adminRouter.post('/admin/change-order-status', admin, async (req, res) => {
    try {
        const {id, status} = req.body;
        let order = await Order.findById(id);
        order.status = status;
        order = await order.save();
        res.json(order);
    } catch (er) {
        res.status(500).json({error: er.message});
    }
});

//* ------------------------------ TOTAL EARNINGS ANALYTICS ------------------------------ *//

adminRouter.get('/admin/analytics', admin, async(req,res) => {
    try {
        const orders = await Order.find({});
        let totalEarnings = 0;
        for(let i=0; i< orders.length; i++){
            for(let j=0; j< orders[i].products.length; j++){
                totalEarnings += orders[i].products[j].quantity * orders[i].products[j].product.price
            }
        }

    //* --------- Categorywise order feteching ----------- *//
        let mobEarnings = await getCatProdcuts('Mobiles');
        let esntEarnings = await getCatProdcuts('Essentials');
        let aplEarnings = await getCatProdcuts('Appliances');
        let bookEarnings = await getCatProdcuts('Books');
        let fashionEarnings = await getCatProdcuts('Fashion');

        let earnings ={
            totalEarnings,
            mobEarnings,
            esntEarnings,
            aplEarnings,
            bookEarnings,
            fashionEarnings

        };

        res.json(earnings);

    } catch (er) {
        res.status(500).json({error: er.message});
        
    }
});


//* ------------------------------------ GET Categorywise PRODUCTS ----------------------------------- *//
const getCatProdcuts = async(category) =>{
    let earnings =0;
    let categoryOrders = await Order.find({
        'products.product.category': category,
    });
    for(let i=0; i< categoryOrders.length; i++){
        for(let j=0; j< categoryOrders[i].products.length; j++){
                earnings += categoryOrders[i].products[j].quantity * categoryOrders[i].products[j].product.price
        }
    }
    return earnings;
}

module.exports = adminRouter;