import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  Sse,
  Redirect,
  HttpStatus,
} from '@nestjs/common';
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
    return { layout: this.layout };
  }

  @Get(':id/update')
  @Render('resources/product-form')
  async updateForm(@Param('id') id: string) {
    return {
      product: await this.productService.findOne(+id),
      layout: this.layout,
    };
  }

  @Post()
  @Redirect('/product', HttpStatus.SEE_OTHER)
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return {
      url: `/product?message=Товар ${product.id})${product.name} создан`,
    };
  }

  @Get()
  @Render('resources/product-list')
  async findAll() {
    return {
      products: await this.productService.findAll(),
      layout: this.layout,
    };
  }

  @Post(':id/update')
  @Redirect('/product', HttpStatus.SEE_OTHER)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(+id, updateProductDto);
    return {
      url: `/product?message=Товар ${product.id})${product.name} обновлён`,
    };
  }

  @Post(':id/remove')
  @Redirect('/product', HttpStatus.SEE_OTHER)
  async remove(@Param('id') id: string) {
    await this.productService.remove(+id);
    return { url: `/product?message=Товар удален` };
  }

  private readonly layout = 'resource.hbs';
}
