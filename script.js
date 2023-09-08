class ProductManager {
    constructor() {
        this.products = [];
    }

    agregarProducto(titulo, descripcion, precio, rutaImagen, codigoIdentificador, stock) {
        const producto = {
            titulo: titulo,
            descripcion: descripcion,
            precio: precio,
            rutaImagen: rutaImagen,
            codigoIdentificador: codigoIdentificador,
            stock: stock
        };
        this.products.push(producto);
    }

    getProductos() {
        return this.products;
    }

    getProductoById(codigoIdentificador) {
        return this.products.find(product => product.codigoIdentificador === codigoIdentificador);
    }
}

// Ejemplo de uso:
const manager = new ProductManager();
manager.agregarProducto("Producto A", "Descripción A", 100, "rutaA.jpg", 1, 50);
manager.agregarProducto("Producto B", "Descripción B", 150, "rutaB.jpg", 2, 40);

console.log(manager.getProductos()); // Mostrará todos los productos
console.log(manager.getProductoById(1)); // Mostrará el producto con código identificador 1
