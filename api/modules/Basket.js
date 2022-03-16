const mongoose = require("mongoose");

const BasketSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
           
    
        },
        products: {
            type: String
        },
        size: {
            type: String
        },
        Quantity: {
            type: Number
        },
        title: {
            type: String,
           
        },        
        photo: {
            type: String,
   
        },
        price: {
            type: Number,
    
        }

    }
)
module.exports = mongoose.model("Basket", BasketSchema);