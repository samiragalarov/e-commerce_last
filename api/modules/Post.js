const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        photo1: {
            type: String,
            required: false,
        },
        photo2: {
            type: String,
            required: false,
        },
        photo3: {
            type: String,
            required: false,
        },
        photo4: {
            type: String,
            required: false,
        },
        photo5: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required:false


        },
        categories: {
            type: String,
            required: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

