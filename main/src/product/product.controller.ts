import { Controller, Get, Post, Param, HttpService } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(
    private prodService: ProductService,
    private httpService: HttpService
  ) {}

  @Get()
  async getAll() {
    console.log('@ get request!!!')
    return this.prodService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    console.log('@ post like requeset ')
    const product = await this.prodService.findOne(id);
    this.httpService.post(`http://localhost:5000/api/products/${id}/like`,{}).subscribe(res => {
      console.log('res');
    })
    
    return this.prodService.update(
      id, 
      { 
        likes: product.likes  + 1
      });
  }

  @EventPattern('product_created')
  async ProductUpdated(product: any) {
    console.log('product created event')
    this.prodService.create({
      id: product.id, 
      title: product.title,
      image: product.image,
      likes: product.likes,

    });
   }
   
   @EventPattern('product_updated')
   async productUpdated(data: any) {
     console.log('product updated event')
     const product = await this.prodService.findOne(data.id);
     this.prodService.update(data.id, data);     
    }
    
    @EventPattern('product_deleted')
    async productDeleted(id: number) {
      console.log('product deleted event')
      const product = await this.prodService.delete(id);      
     }
}
