import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Sse, Redirect } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'product.update').pipe(
      map((data) => {
        return {
          data: JSON.stringify(data),
          type: 'message',
        } as MessageEvent;
      }),
    );
  }

  @Get('create')
  @Render('resources/product-form')
  createForm() {
    return { layout: false };
  }

  @Get(':id/update')
  @Render('resources/product-form')
  async updateForm(@Param('id') id: string) {
    return { product: await this.productService.findOne(+id), layout: false };
  }

  @Post()
  @Redirect('/product')
  async create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const product = await this.productService.create(createProductDto);
    return { product: product, layout: false };
  }

  @Get()
  @Render('resources/product-list')
  async findAll() {
    return { products: await this.productService.findAll(), layout: false };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  @Post(':id/update')
  @Render('resources/product-form')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.update(+id, updateProductDto);
    return { product, layout: false };
  }

  @Post(':id/remove')
  @Redirect('/product')
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(+id);
    return { categories: await this.productService.findAll(), layout: false };
  }
}
