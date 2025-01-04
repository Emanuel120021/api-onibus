import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { Motorista } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('motoristas')
@UseGuards(AuthGuard('jwt'))
export class MotoristaController {
  constructor(private readonly motoristaService: MotoristaService) {}

  @Post()
  create(@Body() data: Omit<Motorista, 'id'>) {
    return this.motoristaService.create(data);
  }

  @Get()
  findAll() {
    return this.motoristaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.motoristaService.findById(+id);
  }

  /*O símbolo + antes de id é uma maneira rápida de converter uma string 
  para um número em TypeScript ou JavaScript.*/
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Motorista>) {
    return this.motoristaService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.motoristaService.delete(+id);
  }
}
