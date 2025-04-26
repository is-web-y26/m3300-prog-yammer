import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Sse,
  Redirect,
  UseFilters, HttpStatus,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, interval, map, Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';
import { NotFoundExceptionFilter } from '../filters/not_found_exc.filter';

@ApiExcludeController()
@Controller('subcategory')
export class SubcategoryController {
  constructor(
    private readonly subcategoryService: SubcategoryService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'subcategory.update').pipe(
      map((data) => {
        return {
          data: JSON.stringify(data),
          type: 'message',
        } as MessageEvent;
      }),
    );
  }

  @Get('create')
  @Render('resources/subcategory-form')
  createForm() {
    return { layout: false };
  }

  @Get(':id/update')
  @Render('resources/subcategory-form')
  async updateForm(@Param('id') id: string) {
    return {
      subcategory: await this.subcategoryService.findOne(+id),
      layout: false,
    };
  }

  @Post()
  @Redirect('/subcategory', HttpStatus.SEE_OTHER)
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    const subcategory =
      await this.subcategoryService.create(createSubcategoryDto);
    return {
      url: `/subcategory?message=Подкатегория ${subcategory.id})${subcategory.name} создана`,
    };
  }

  @Get()
  @Render('resources/subcategory-list')
  async findAll() {
    return {
      subcategories: await this.subcategoryService.findAll(),
      layout: false,
    };
  }

  @Post(':id/update')
  @Redirect('/subcategory', HttpStatus.SEE_OTHER)
  async update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    const subcategory = await this.subcategoryService.update(
      +id,
      updateSubcategoryDto,
    );
    return {
      url: `/subcategory?message=Подкатегория ${subcategory.id})${subcategory.name} обновлена`,
    };
  }

  @Post(':id/remove')
  @Redirect('/subcategory', HttpStatus.SEE_OTHER)
  async remove(@Param('id') id: string) {
    await this.subcategoryService.remove(+id);
    return { url: `/subcategory?message=Подкатегория удалена` };
  }
}
