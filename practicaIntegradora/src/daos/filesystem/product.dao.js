// import fs from 'fs';

// export default class ProductDaoFS {
//     constructor(path) {
//         this.path = path;
//     }

//     async getAll() {
//         try {
//             if (fs.existsSync(this.path)) {
//                 const productsJSON = await fs.promises.readFile(this.path, 'utf-8')
//                 const productsJs = JSON.parse(productsJSON)
//                 return productsJs
//             } else return []

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async #getMaxId() {
//         let maxId = 0;
//         const products = await this.getAll();
//         products.map((product) => {
//             if (product.id > maxId) maxId = product.id;;
//         });
//         return maxId;
//     }

//     // async createProduct(obj) {
//     //     try {
//     //         const product = {
//     //             id: await this.#getMaxId() + 1,
//     //             status: true, //el estatus viene por defecto
//     //             ...obj
//     //         }
//     //         const products = await this.getProducts()
           
//     //         products.push(product)
//     //         await fs.promises.writeFile(this.path, JSON.stringify(products));
//     //         return product;
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }
//     async create(obj) {
//         try {
//             const products = await this.getAll();
//             const existingProduct = products.find(product => product.code === obj.code);
    
//             if (existingProduct) {
//                 throw new Error('Producto con el mismo código ya existe.');
//             }
    
//             const product = {
//                 id: await this.#getMaxId() + 1,
//                 status: true,
//                 ...obj
//             };
    
//             products.push(product);
//             await fs.promises.writeFile(this.path, JSON.stringify(products));
//             return product;
//         } catch (error) {
//             throw new Error(error)
//         }
//     }
    
    

//     async getById(id) {
//         try {
//             const products = await this.getAll();
//             const product = products.find(product => product.id === id)
//             if (!product) return false;
//             return product;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async getByLimit(limit){
//         try {
//             const products = await this.getAll();
//             if(!limit || limit >= products.length) return products;
//             else return products.slice(0, limit);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async update(obj, id) {
//         try {
//             const products = await this.getAll(); //aca llamo el array de producto
//             const index = products.findIndex(product => product.id === id); //aca buscamos por el id que llega por parametro, si lo encuenta me devuelve el indice(posicion)
//             if (index === -1) return false // si no lo encuentra me devuelve -1
//             else products[index] = { ...obj, id } //si lo encuetra me devuelve el objeto
//             await fs.promises.writeFile(this.path, JSON.stringify(products))
//         } catch (error) {
//             console.log(error);
//         }
//     }
    
//     async delete(id) {
//         try {
//             const products = await this.getAll();
//             if (products.length < 0) return false;
//             const newArray = products.filter(product => product.id !== id)
//             await fs.promises.writeFile(this.path, JSON.stringify(newArray))
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

import fs from "fs";

export default class ProductDaoFS {
  constructor(path) {
    this.path = path;
  }

  async #getMaxId() {
    let maxId = 0;
    const products = await this.getAll();
    products.map((prod) => {
      if (prod.id > maxId) maxId = prod.id;
    });
    return maxId;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJSON = JSON.parse(products);
        return productsJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const product = products.find((prod) => prod.id === Number(id));
      if (product) {
        return product;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const product = {
        id: (await this.#getMaxId()) + 1,
        ...obj,
      };
      const productsFile = await this.getAll();
      productsFile.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async update(obj, id) {
    try {
      const productsFile = await this.getAll();
      const index = productsFile.findIndex((prod) => prod.id === id);
      if (index === -1) {
        throw new Error(`Id ${id} not found`);
      } else {
        productsFile[index] = { ...obj, id };
      }
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const productsFile = await this.getAll();
      if (productsFile.length > 0) {
        const newArray = productsFile.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      } else {
        throw new Error(`Product id: ${id} not found`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}