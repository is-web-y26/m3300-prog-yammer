import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, {
    description: 'Создание новой категории',
  })
  create(
    @Args('createCategoryInput', {
      description: 'Данные для создания категории',
    })
    createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], {
    name: 'categories',
    description: 'Получение списка всех категорий',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, {
    name: 'category',
    description: 'Получение категории по ID',
  })
  findOne(
    @Args('id', {
      type: () => Int,
      description: 'ID категории',
    })
    id: number,
  ) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category, {
    description: 'Обновление данных категории',
  })
  updateDriver(
    @Args('updateCategoryInput', {
      description: 'Данные для обновления категории',
    })
    updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
  }

  @Mutation(() => Category, {
    description: 'Удаление категори',
  })
  removeDriver(
    @Args('id', {
      type: () => Int,
      description: 'ID категории для удаления',
    })
    id: number,
  ) {
    return this.categoryService.remove(id);
  }
}
