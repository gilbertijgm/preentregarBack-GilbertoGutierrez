import { CartDaoMongoDB } from '../daos/mongodb/cart.dao.js';
const cartDao = new CartDaoMongoDB();
import ProductDaoMongoDB from '../daos/mongodb/product.dao.js';
const prodDao = new ProductDaoMongoDB(); 


export const getById = async (id) => {
    try {
        const cart = await cartDao.getById(id);
        if(!cart) return false;
        else return cart;
    } catch (error) {
        console.log(error);
    }
}

export const create = async () => {
    try {
        const newCart = await cartDao.create();
        if(!newCart) return false;
        else return newCart;
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async (idCart, idProd) => {
    try {
        const cartExists = await cartDao.getById(idCart);
        if(!cartExists) throw new Error('Product not found');
        const newProd = await cartDao.addProductToCart(idCart, idProd);
        return newProd;
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (id) => {
    try {
        const cartDel = await cartDao.remove(id);
        if(!cartDel) return false;
        else return cartDel;
    } catch (error) {
        console.log(error);
    }
}