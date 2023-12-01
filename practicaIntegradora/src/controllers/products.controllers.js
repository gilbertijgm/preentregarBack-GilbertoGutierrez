import * as service from '../services/product.services.js';


export const aggregation1 = async(req,res,next) => {
    try {
        const { category, orderPrice} = req.query;
        const response = await service.aggregation1(category);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export const getByCode = async (req, res, next) => {
    try {
      const { code } = req.query;
      const item = await service.getByCodeProduct(code);
      if (!item) throw new Error("User not found!");
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

export const getAll = async (req,res,next) => {
    try {
        const {page,limit} = req.query;
        const response = await service.getAll(page, limit);
        //res.status(200).json(response);
        const nextLink = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
        const prevLink = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;
        const nextPage = response.hasNextPage ? `${response.nextPage}` : null;
        const prevPage = response.hasPrevPage ? `${response.prevPage}` : null;
        
        res.json({
            payload: response.docs,
            info: {
                //totalDocs: response.totalDocs,
                totalPages: response.totalPages,
                prevPage,
                nextPage,
                page: response.page,
                prevLink,
                nextLink
            }
        })
    } catch (error) {
        next(error.message);
    }
}

export const getById = async (req,res,next) => {
    try {
        const { id  } = req.params;
        const response = await service.getById(id);
        if(!response) res.status(404).json({ msg: 'product not found' });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
}

export const create = async (req,res,next) => {
    try {
        const newProd = await service.create(req.body);
        if(!newProd) res.status(404).json({ msg: 'error create product' });
        else res.status(200).json(newProd);
    } catch (error) {
        next(error.message);
    }
}

export const update = async (req,res,next) => {
    try {
        const { id  } = req.params;
        const prodUpd = await service.update(id, req.body);
        if(!prodUpd) res.status(404).json({ msg: 'error update product' });
        else res.status(200).json(prodUpd);
    } catch (error) {
        next(error.message);
    }
}

export const remove = async (req,res,next) => {
    try {
        const { id  } = req.params;
        const prodDel = await service.remove(id);
        if(!prodDel) res.status(404).json({ msg: 'error delete' });
        else res.status(200).json({ msg: `product id: ${id} deleted}`});

    } catch (error) {
        next(error.message);
    }
}
// export const remove = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const prodDel = await service.remove(id);
//       if (!prodDel) res.status(404).json({ msg: "Error delete product!" });
//       else res.status(200).json({ msg: `Product id: ${id} deleted` });
//     } catch (error) {
//       next(error.message);
//     }
//   }