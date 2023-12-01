import ProductDaoMongoDB from '../daos/mongodb/product.dao.js';
const prodDao = new ProductDaoMongoDB();

// import ProductDaoFS from '../daos/filesystem/product.dao.js';
// import { __dirname } from '../utils.js';
// const prodDao = new ProductDaoFS(
//     __dirname + "/daos/filesystem/data/products.json"
// );

export const aggregation1 = async(category ) => {
    try {
        return await prodDao.aggregation1(category);
    } catch (error) {
        console.log(error);
    }
}

export const getAll = async (page, limit) => {
    try {
        return await prodDao.getAll(page, limit);
    } catch (error) {
        console.log(error);
    }
}

export const getByCodeProduct = async (code) => {
    try {
      const item = await prodDao.getProductByCode(code);
      if (!item) return false;
      else return item;
    } catch (error) {
      console.log(error);
    }
  };

export const getById = async (id) => {
    try {
        const prod = await prodDao.getById(id);
        if(!prod) return false;
        else return prod;
    } catch (error) {
        console.log(error);
    }
}

export const create = async (obj) => {
    try {
        const newProd = await prodDao.create(obj);
        if(!newProd) return false;
        else return newProd;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (id, obj) => {
    try {
        const prodUpd = await prodDao.update(id, obj);
        if(!prodUpd) return false;
        else return prodUpd;
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (id) => {
    try {
        const prodDel = await prodDao.delete(id);
        if(!prodDel) return false;
        else return prodDel;
    } catch (error) {
        console.log(error);
    }
}
