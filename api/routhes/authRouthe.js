const router = require('express').Router();
const User = require('../modules/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require(".././middelware/middelware");

router.post('/register', async(req ,res) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            password: hashedPass,
        })
        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);

    }

})

router.post('/login', async(req ,res) =>{  
    try{
        const {username , password} = req.body
        const user = await User.findOne({username : username})
        !user && res.status(400).json("Wrong  email!");
    
        const validated = await bcrypt.compare(password, user.password);
        !validated && res.status(400).json("Wrong password!");
    
    
        /// accses token
        const accsesToken = jwt.sign({id: user._id, isAdmin: user.isAdmin,},"secret")
        res.status(200).json({
            username1: user.username,
            password : user.password,
            isadmin: user.isAdmin,
            id: user._id,
            accsesToken: accsesToken
       })
    
    
    
    }catch(err){
        res.status(500).json(err);
    
    }

})

router.get("/getalluser", verifyTokenAndAdmin , async(req,res)=>{
    try{
        const product = await User.find()
        res.status(200).send(product);
 
    }catch(err){
        res.status(500).send(err);

    } 
})

router.delete("/delteUser/:id", verifyTokenAndAdmin , async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send(user);
 
    }catch(err){
        res.status(500).send(err);

    } 
})

module.exports = router;
