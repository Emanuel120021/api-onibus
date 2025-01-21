import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OnibusService } from './onibus.service';
import { Onibus } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('onibus')
export class OnibusController {
  constructor(private readonly onibusService: OnibusService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Omit<Onibus, 'id'>) {
    return this.onibusService.create(data);
  }

  @Get()
  findAll() {
    return this.onibusService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findById(@Param('id') id: string) {
    return this.onibusService.findById(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Onibus>) {
    return this.onibusService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.onibusService.delete(+id);
  }
}
