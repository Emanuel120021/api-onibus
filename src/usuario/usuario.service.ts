import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Omit<Usuario, 'id'>,
  ): Promise<{ id: number; login: string; message: string }> {
    // Verifica se já existe um ônibus com a mesma placa
    const usuarioExiste = await this.prisma.usuario.findUnique({
      where: { login: data.login },
    });

    if (usuarioExiste) {
      throw new BadRequestException('Usuário já cadastrado');
    }

    // Cria o novo ônibus
    const usuario = await this.prisma.usuario.create({ data });

    // Retorna apenas os campos necessários
    return {
      id: usuario.id,
      login: usuario.login,
      message: 'Usuário cadastrado com sucesso!',
    };
  }

  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async findByLogin(login: string): Promise<Usuario> {
    return await this.prisma.usuario.findUniqueOrThrow({ where: { login } });
  }

  async update(
    id: number,
    data: Partial<Usuario>,
  ): Promise<{ id: number; login: string; message: string }> {
    const usuario = await this.prisma.usuario.update({ where: { id }, data });

    try {
      return {
        id: usuario.id,
        login: usuario.login,
        message: 'Usuário atualizado com sucesso!',
      };
    } catch (error) {
      throw new NotFoundException('Erro ao atualizar usuário!');
    }
  }

  async delete(
    id: number,
  ): Promise<{ id: number; login: string; message: string }> {
    const usuario = await this.prisma.usuario.delete({ where: { id } });
    try {
      return {
        id: usuario.id,
        login: usuario.login,
        message: 'Ônibus deletado com sucesso!',
      };
    } catch (error) {
      throw new NotFoundException('Erro ao deletar o ônibus!');
    }
  }
}
