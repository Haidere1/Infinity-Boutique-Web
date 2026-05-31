import mongoose, { mongo } from "mongoose";
const productsM=mongoose.Schema(
    {
        prID: Number,
        prName: String,
        prPrice:String,
        prDescription: String,
        prImage: String,
        category: { type: String, enum: ['men', 'women', 'unisex'], default: 'unisex' }
    }
);

const prmodel=mongoose.model('Product',productsM);

export default prmodel;


