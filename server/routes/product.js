const express = require("express");
const productRouter = express.Router();
const auth = require('../middlewares/auth')
const {Product} = require('../models/product');


//* -------------------------------------Fetch Product---------------------------------- *//

productRouter.get('/api/prodcuts', auth, async(req, res) => {
    try {
        const products = await Product.find({category: req.query.category});
        res.json(products);
    } catch (er) {
        res.status(500).json({error: er.message});
    }
});

//* -------------------------------------Search Product---------------------------------- *//

productRouter.get('/api/prodcuts/search/:name', auth, async(req, res) => {
    try {
        const products = await Product.find({ name: {$regex: req.params.name, $options: "i"},});
        res.json(products);
    } catch (er) {
        res.status(500).json({error: er.message});
    }
});


//* ------------------------------------- Product Ratings ---------------------------------- *//

productRouter.post('/api/rate-product', auth, async(req, res) =>{
    try {
        const {id, rating} = req.body;
        let product = await Product.findById(id);

        for(let i=0; i< product.ratings.length; i++){
            if(product.ratings[i].userId == req.user){
                product.ratings.splice(i, 1);
                break;
            }
        }
        const ratingSchema ={
            userId: req.user,
            rating,
        }

        product.ratings.push(ratingSchema);
        product = await product.save();
        res.json(product);
    } catch (er) {
        res.status(500).json({error: er.message})
        
    }
});


//* ----------------------------------------- DEAL OF THE DAY ----------------------------------- *//

productRouter.get('/api/deal-of-day', auth, async (req, res) =>{
    try {
        let products = await Product.find({});
        products = products.sort((p1, p2) =>{
            let p1Sum = 0;
            let p2Sum = 0;

            for(let i =0; i<p1.ratings.length; i++){
                p1Sum+= p1.ratings[i].rating;
            }
            for(let i=0; i<p2.ratings.length; i++){
                p2Sum+= p2.ratings[i].rating;
            }

            return p1Sum < p2Sum ? 1 : -1;
        });

        res.json(products[0]);
    } catch (er) {
        res.status(500).json({error: er.message});
        
    }
});

module.exports = productRouter;