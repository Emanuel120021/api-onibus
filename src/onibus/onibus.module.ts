import { Module } from '@nestjs/common';
import { OnibusService } from './onibus.service';
import { OnibusController } from './onibus.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [OnibusService],
  imports: [PrismaModule],
  controllers: [OnibusController],
})
export class OnibusModule {}
