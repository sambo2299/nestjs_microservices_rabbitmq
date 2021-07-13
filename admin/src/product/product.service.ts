import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
// import { ProductDTO} from './product.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async all(): Promise<Product[]>{
    return this.productRepository.find();
  }
  
  async save(data): Promise<Product> {
    return this.productRepository.save(data);
  }

  async getOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: {
        id: id
      }
    })
  }

  async update(
    id: number, 
    data
    ): Promise<any> {
      return this.productRepository.update(id, data);
  }

  async delete(
    id: number
  ): Promise<any> {
    return this.productRepository.delete(id);
  }
}
