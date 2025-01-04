import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() data: Omit<Usuario, 'id'>) {
    return this.usuarioService.create(data);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':login')
  findByLogin(@Param('login') login: string) {
    return this.usuarioService.findByLogin(login);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Usuario>) {
    return this.usuarioService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usuarioService.delete(+id);
  }
}
