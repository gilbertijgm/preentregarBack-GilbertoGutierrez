import fs from 'fs';
import { CartModel } from './models/cart.model.js';
//import { ProductModel } from './models/product.models.js';
export class CartDaoMongoDB {
    async getAll() {
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await CartModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await CartModel.create(obj);
            return response
        } catch (error) {
            console.log(error);
        }
    }

    // async update(id, obj) {
    //     try {
    //         const response = await CartModel.findByIdAndUpdate(id, obj, {
    //             new: true,
    //         });
    //         return response;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async remove(id) {
        try {
            const response = await CartModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idCart, idProd) {
        try {
            const cart = await CartModel.findOne({ _id: idCart }); // Buscar el carrito por su ID

            const productExists = cart.products.some((product) => product._id == idProd); // Verificar si el producto ya existe en el carrito
            if (productExists) {
                // Si el producto ya existe incrementar la cantidad
                const existingProductIndex = cart.products.findIndex(
                    (product) => product._id == idProd
                );
                cart.products[existingProductIndex].quantity += 1;
            } else {
                // Si el producto no existe agregarlo al carrito
                cart.products.push(idProd);
            }

            cart.save(); // Guardar los cambios en el carrito en la base de datos

            return cart;
        } catch (error) {
            console.error(error);
        }
    }


}