import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DelincuenteService } from './delincuente.service';
import { CreateDelincuenteDto } from './dto/create-delincuente.dto';
import { UpdateDelincuenteDto } from './dto/update-delincuente.dto';

@Controller('delincuente')
export class DelincuenteController {
  constructor(private readonly service: DelincuenteService) {}

  @Post()
  create(@Body() dto: CreateDelincuenteDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDelincuenteDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
