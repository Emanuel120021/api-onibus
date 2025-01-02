import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MotoristaService } from 'src/motorista/motorista.service';
import { OnibusService } from 'src/onibus/onibus.service';
import { MotoristaModule } from 'src/motorista/motorista.module';
import { OnibusModule } from 'src/onibus/onibus.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
