import { Controller, Get, Post, Body, Param, Put, Delete, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(
    private prodService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy 
    ) {}

  @Get()
  all() {
    return this.prodService.all();
  }

  @Post()
  async create(
    @Body('title') title: string,
    @Body('image') image: string
    ) {
      const product = await this.prodService.save({title, image});
      this.client.emit('product_created', product);
      return product;
  }

  @Get(':id')
  async get(@Param("id") id: number){
    return this.prodService.getOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    await this.prodService.update(id, { title, image });
    const product = await this.prodService.getOne(id);
    this.client.emit('product_updated', product);
    return product;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
  ) {
    await this.prodService.delete(id);
    this.client.emit('product_deleted', id);
  }

  @Post(':id/like')
  async like(
    @Param('id') id: number,
  ) {
    console.log('like request !!!', id);
    const product = await this.prodService.getOne(id);
    return this.prodService.update(id, {
      likes: product.likes + 1
    });
  }

}
