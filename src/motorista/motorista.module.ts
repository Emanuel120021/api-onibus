import { Module } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { MotoristaController } from './motorista.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MotoristaService],
  controllers: [MotoristaController],
})
export class MotoristaModule {}
