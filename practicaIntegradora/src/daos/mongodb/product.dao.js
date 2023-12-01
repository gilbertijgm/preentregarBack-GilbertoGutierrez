// import { model } from "mongoose";
import { ProductModel } from "../mongodb/models/product.models.js";

export default class ProductDaoMongoDB {
  // constructor(collection, schema) {
  //   this.collection = model(collection, schema);
  // }

  async aggregation1(category) {
    try {
      return await ProductModel.aggregate([
        {
          $match: { 
            category: category,
            //status: status
          } //agrupar por categoria 
        },
        // {
        //   $match: { status: status } //agrupar por disponibilidad, si es true o false
        // }
        {
          $sort: { price: 1 } //ordena de forma asc/descendente
        }
      ])
    } catch (error) {
      console.log(error);
    }
  }


  async getAll(page = 1, limit = 5) {
    try {
      // return await this.collection.find({});
      return await ProductModel.paginate({},{ page, limit });
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByCode(code) {
    try {
      const response = await ProductModel.find({ code: code });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      return await ProductModel.create(obj);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      return await ProductModel.findByIdAndUpdate({ _id: id }, obj, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  // async delete(id) {
  //   try {
  //     const response = await ProductModel.findByIdAndDelete(id);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
