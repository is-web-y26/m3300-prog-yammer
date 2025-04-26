import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';

@Resolver(() => Subcategory)
export class SubcategoryResolver {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Mutation(() => Subcategory, {
    description: 'Создание новой подкатегории',
  })
  create(
    @Args('createSubcategoryInput', {
      description: 'Данные для создания подкатегории',
    })
    createSubcategoryInput: CreateSubcategoryInput,
  ) {
    return this.subcategoryService.create(createSubcategoryInput);
  }

  @Query(() => [Subcategory], {
    name: 'categories',
    description: 'Получение списка всех подкатегорий',
  })
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Query(() => Subcategory, {
    name: 'subcategory',
    description: 'Получение подкатегории по ID',
  })
  findOne(
    @Args('id', {
      type: () => Int,
      description: 'ID подкатегории',
    })
    id: number,
  ) {
    return this.subcategoryService.findOne(id);
  }

  @Mutation(() => Subcategory, {
    description: 'Обновление данных подкатегории',
  })
  updateDriver(
    @Args('updateSubcategoryInput', {
      description: 'Данные для обновления подкатегории',
    })
    updateSubcategoryInput: UpdateSubcategoryInput,
  ) {
    return this.subcategoryService.update(updateSubcategoryInput.id, updateSubcategoryInput);
  }

  @Mutation(() => Subcategory, {
    description: 'Удаление подкатегори',
  })
  removeDriver(
    @Args('id', {
      type: () => Int,
      description: 'ID подкатегории для удаления',
    })
    id: number,
  ) {
    return this.subcategoryService.remove(id);
  }
}
