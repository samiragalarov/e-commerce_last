const router = require('express').Router();
const Product = require('../modules/Post')
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require(".././middelware/middelware");
const { json } = require('body-parser');

router.post('/createProduct', verifyTokenAndAdmin ,async(req,res) =>{
    try{
        const newPost = new Product(req.body);
        const product = await newPost.save();
        res.status(200).json(product);


    }catch(err){
        console.log(err)
        res.status(500).json(err);

    }
})

router.delete('/deleteProduct/:id',verifyTokenAndAdmin,async(req,res) =>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(product)

    }catch(err){
        console.log(err)
        res.status(500).json(err);

    }
})

router.get('/getProducts' , async(req,res) =>{
    try{
        const products = await Product.find()
        res.status(200).send(products);


    }catch(err){
        
        res.status(500).send(err);

    }

})
//,verifyToken
//get single product
router.get('/getProducts/:id'  ,async(req,res) =>{
    try{
        const products = await Product.findById(req.params.id)
        res.status(200).send(products);


    }catch(err){
        
        res.status(500).send(err);

    }

})


router.get("/getbyCategory" , async(req,res)=>{
    try{
        const product = await Product.find({categories :req.query.cat})
        res.status(200).send(product);

    }catch(err){
        res.status(500).send(err);

    }
})

///get lastest products

router.get("/getlastest" , async(req,res)=>{
    try{
        const product = await Product.find().sort({$natural: -1 }).limit(8)
        res.status(200).send(product);
 
    }catch(err){
        res.status(500).send(err);

    } 
})

router.get("/featuredProducts" , async(req,res)=>{
    try{
        const product = await Product.find().limit(4)
        res.status(200).send(product);
 
    }catch(err){
        res.status(500).send(err);

    } 
})

///related products
router.get("/relatedproduct" , async(req,res)=>{
    try{
        const product = await Product.find({categories : req.query.categories}).limit(4)
        res.status(200).send(product);
    }catch(err){
        res.status(500).send(err);

    }
})

///pagintation
router.get("/pagination", async(req,res)=>{
    

    try{
        const a = req.query.limit
        let startindex = req.query.startIndex
  

        const products = await Product.find().limit(JSON.parse(a)).skip(JSON.parse(startindex)).exec()
        res.status(200).send(products);

    }catch(err){
        res.status(500).send(err);

    }
})

module.exports = router;