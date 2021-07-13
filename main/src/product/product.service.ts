import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductSchema, ProductDocument } from './product.model'
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ){}

  async all(): Promise<Product[]> {
    return this.productModel
      .find()
      .exec();
  };

  async create(data): Promise<Product> {
    console.log(data);
    return this.productModel.create(data);
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({
      id: id
    });
  };

  async update(
    id: number,
    data
  ): Promise<Product> {
    await this.productModel.updateOne({id}, data);
    return this.productModel.findOne({id});
  };

  async delete(
    id: number
    ): Promise<any> {
    return this.productModel.findOneAndRemove({id});
  };
};
