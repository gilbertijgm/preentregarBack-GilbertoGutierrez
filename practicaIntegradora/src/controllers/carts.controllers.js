import * as service from '../services/cart.services.js';

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.getById(id);
        if(!response) res.error(404).json({msg: 'cart not found'})
        else res.status(200).json(response)
    } catch (error) {
        next(error.message);
    }
}

export const create = async (req, res, next) => {
    try {
       const newCart = await service.create(); 
       if(!newCart) throw Error('Error al crear el carrito');
       else res.status(200).json({msg: 'carrito creado con exito', newCart});
    } catch (error) {
        next(error.message);
    }
}

export const addProductToCart = async (req, res, next) => {
    try {
        const { idCart, idProd } = req.params;
        const newProduct = await service.addProductToCart(idCart, idProd);

        res.json(newProduct);
    } catch (error) {
        next(error.message);
    }
}