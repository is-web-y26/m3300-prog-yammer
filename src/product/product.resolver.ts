import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product, {
    description: 'Создание нового товара',
  })
  create(
    @Args('createProductInput', {
      description: 'Данные для создания товара',
    })
    createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], {
    name: 'categories',
    description: 'Получение списка всех товаров',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, {
    name: 'product',
    description: 'Получение товара по ID',
  })
  findOne(
    @Args('id', {
      type: () => Int,
      description: 'ID товара',
    })
    id: number,
  ) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product, {
    description: 'Обновление данных товара',
  })
  updateDriver(
    @Args('updateProductInput', {
      description: 'Данные для обновления товара',
    })
    updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product, {
    description: 'Удаление товара',
  })
  removeDriver(
    @Args('id', {
      type: () => Int,
      description: 'ID товара для удаления',
    })
    id: number,
  ) {
    return this.productService.remove(id);
  }
}
