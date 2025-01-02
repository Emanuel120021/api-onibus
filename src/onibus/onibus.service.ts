import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Onibus } from '@prisma/client';

@Injectable()
export class OnibusService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Omit<Onibus, 'id'>,
  ): Promise<{ id: number; numero: string; message: string }> {
    // Verifica se já existe um ônibus com a mesma placa
    const onibusExiste = await this.prisma.onibus.findUnique({
      where: { placa: data.placa },
    });

    if (onibusExiste) {
      throw new BadRequestException(
        'Já existe um ônibus cadastrado com essa placa.',
      );
    }

    // Cria o novo ônibus
    const onibus = await this.prisma.onibus.create({ data });

    // Retorna apenas os campos necessários
    return {
      id: onibus.id,
      numero: onibus.numero,
      message: 'Ônibus cadastrado com sucesso!',
    };
  }

  async findAll(): Promise<Onibus[]> {
    return this.prisma.onibus.findMany();
  }

  async findById(id: number): Promise<Onibus> {
    return await this.prisma.onibus.findUniqueOrThrow({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<Onibus>,
  ): Promise<{ id: number; numero: string; message: string }> {
    const onibus = await this.prisma.onibus.update({ where: { id }, data });

    try {
      return {
        id: onibus.id,
        numero: onibus.numero,
        message: 'Ônibus atualizado com sucesso!',
      };
    } catch (error) {
      throw new NotFoundException('Erro ao atualizar ônibus!');
    }
  }

  async delete(
    id: number,
  ): Promise<{ id: number; numero: string; message: string }> {
    const onibus = await this.prisma.onibus.delete({ where: { id } });
    try {
      return {
        id: onibus.id,
        numero: onibus.numero,
        message: 'Ônibus deletado com sucesso!',
      };
    } catch (error) {
      throw new NotFoundException('Erro ao deletar o ônibus!');
    }
  }
}
