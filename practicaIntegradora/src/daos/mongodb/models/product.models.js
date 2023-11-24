import mongoose from "mongoose";

export const productsCollectionName = "products";

const productsShema = new mongoose.Schema({
    title: { type: String, required: true },
    descripcion: { type: String },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true},
    category: { type: String, required: true},
    status: { type: Boolean, default: true},
    // carts: [{
    //     type: mongoose.Schema.Types.ObjectId, //aqui le indico que se va a recibir el id de una coleccion
    //     ref: 'carts', //aqui hago referencia a la coleccion que pertenece el id que recibe en type: mongoose.Schema.Types.ObjectId
    //     default: [] //aqui indico que inicialmente va a estar vacio
    // }]
});

export const ProductModel = mongoose.model(
    productsCollectionName,
    productsShema
);