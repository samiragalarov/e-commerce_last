const router = require('express').Router();
const Product = require('../modules/Post')
const Basket = require('../modules/Basket')


const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require(".././middelware/middelware");
const Post = require('../modules/Post');



///add to baket
router.post("/addBasket/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const basketItem = new Basket(req.body);
        const basket = await basketItem.save();
        res.status(200).json(basket);


    } catch (err) {
        console.log(err)
        res.status(500).json(err);

    }
})

router.get('/basketProducts/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {

        const baskets = await Basket.find({ userId: req.params.id })
        console.log(baskets)
        res.status(200).json(baskets)


    } catch (err) {
        console.log(err)
        res.status(500).json(err);

    }
})

router.delete('/basketProductsdelete/:id', verifyToken, async (req, res) => {
    try {

        const basketsitem = await Basket.findByIdAndDelete(req.params.id)

        res.status(200).json(basketsitem)


    } catch (err) {
        console.log(err)
        res.status(500).json(err);

    }
})




module.exports = router

