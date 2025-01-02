import { Injectable, NotFoundException } from '@nestjs/common';
import { Motorista } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MotoristaService {
  constructor(private prisma: PrismaService) {}

  /*  
  Omit<Type, Keys> ==> cria um novo tipo baseado em um tipo existente (Type)
  mas exclui as propriedades especificadas em Keys. 
  - Type: O tipo base do qual você quer derivar um novo tipo.
  - Keys: As chaves (propriedades) que você quer excluir do tipo base.
*/
  async create(
    data: Omit<Motorista, 'id'>,
  ): Promise<{ id: number; nome: string; message: string }> {
    // Cria o motorista no banco de dados
    const motorista = await this.prisma.motorista.create({ data });

    try {
      // Retorna apenas os campos necessários
      return {
        id: motorista.id,
        nome: motorista.nome,
        message: 'Motorista criado com sucesso!',
      };
    } catch (error) {
      throw new NotFoundException('Não foi possível cadastrar o motorista!');
    }
  }

  async findAll(): Promise<Motorista[]> {
    return this.prisma.motorista.findMany();
  }

  async findById(id: number): Promise<Motorista> {
    return await this.prisma.motorista.findUniqueOrThrow({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<Motorista>,
  ): Promise<{ id: number; nome: string; message: string }> {
    const motorista = await this.prisma.motorista.update({
      where: { id },
      data,
    });

    try {
      return {
        id: motorista.id,
        nome: motorista.nome,
        message: 'Motorista deletado com sucesso!',
      };
    } catch (error) {
      throw new NotFoundException('Não foi possível atualizar o motorista!');
    }
  }

  async delete(
    id: number,
  ): Promise<{ id: number; nome: string; message: string }> {
    try {
      // Deleta o motorista no banco de dados e retorna o registro deletado
      const motorista = await this.prisma.motorista.delete({ where: { id } });

      // Retorna apenas os campos necessários com a mensagem
      return {
        id: motorista.id,
        nome: motorista.nome,
        message: 'Motorista deletado com sucesso!',
      };
    } catch (error) {
      // Captura erros, incluindo o caso de motorista não encontrado
      throw new NotFoundException('Não foi possível deletar o motorista!');
    }
  }
}
