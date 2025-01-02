import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    //Quando o módulo inicia, ele conecta com o banco
    await this.$connect();
  }

  async onModuleDestroy() {
    //Quando o módulo inicia, ele desconecta do banco
    await this.$disconnect();
  }
}
