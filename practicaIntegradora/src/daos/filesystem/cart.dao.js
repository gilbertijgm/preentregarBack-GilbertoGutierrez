import fs from 'fs';

export class CartManager {
    constructor(path){
        this.path = path;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsJSON = await fs.promises.readFile(this.path, 'utf-8')
                const cartsJs = JSON.parse(cartsJSON)
                return cartsJs
                // return JSON.parse(cartsJSON);
            } else return []

        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId() {
        let maxId = 0;
        const carts = await this.getAll();
        carts.map((cart) => {
            if (cart.id > maxId) maxId = cart.id;;
        });
        return maxId;
    }

    async createCart() {
        try {
            const cart = {
                id: (await this.#getMaxId()) + 1,
                products: []
            }
            const cartsFile = await this.getAll();
            cartsFile.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getAll();
            const cart = carts.find(cart => cart.id === id)
            if (!cart) return false;
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idCart, idProd){
       
        /*
        try {
            const carts = await this.getCarts();
            //verificamos si existe un carrito
            const cartExi = await this.getCartById(idCart);
            if(cartExi){
                const productExistCart = cartExi.products.find((p) => p.id === idPro);
                if(productExistCart) productExistCart.quantity + 1
                else {
                    const prod = {
                        product: idPro,
                        quantity: 1
                    }
                    cartExi.products.push(prod)
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
                console.log(product);
                return cartExi;
            }
        } catch (error) {
            console.log(error);
        }
    */
        try {
            const carts = await this.getAll();
            const cartIndex = carts.findIndex((c) => c.id == idCart);
    
            if (cartIndex !== -1) {
                const cart = carts[cartIndex];
                const existingProductIndex = cart.products.findIndex((p) => p.product === idProd);
    
                if (existingProductIndex !== -1) {
                    // Incrementa la cantidad si el producto ya existe en el carrito
                    cart.products[existingProductIndex].quantity += 1;
                } else {
                    // Agrega un nuevo producto al carrito con cantidad 1
                    const newProduct = {
                        product: idProd,
                        quantity: 1,
                    };
                    cart.products.push(newProduct);
                }
    
                // Actualiza el archivo con los cambios en el carrito
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
    
                // Devuelve el carrito actualizado
                return cart;
            } else {
                console.log("Carrito no encontrado");
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    }


}