import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('api/category')
export class CategoryApiController {
  @Get()
  @ApiOperation({ summary: 'Retrieve all items' })
  @ApiResponse({ status: 200, description: 'Returns a list of items.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getAllItems(): string {
    return 'This action returns all items';
  }
}
