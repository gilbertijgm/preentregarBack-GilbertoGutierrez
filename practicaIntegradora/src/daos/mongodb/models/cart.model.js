import mongoose from "mongoose";

export const cartsCollectionName = "carts";

const cartsSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

cartsSchema.pre("find", function () {
    this.populate("products");
});

export const CartModel = mongoose.model(
    cartsCollectionName, 
    cartsSchema
);