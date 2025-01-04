import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RotasController } from './rotas/rotas.controller';
import { RotasService } from './rotas/rotas.service';
import { RotasModule } from './rotas/rotas.module';
import { PrismaModule } from './prisma/prisma.module';
import { MotoristaModule } from './motorista/motorista.module';
import { OnibusModule } from './onibus/onibus.module';
import { MotoristaService } from './motorista/motorista.service';
import { OnibusService } from './onibus/onibus.service';
import { MotoristaController } from './motorista/motorista.controller';
import { OnibusController } from './onibus/onibus.controller';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RotasModule,
    PrismaModule,
    MotoristaModule,
    OnibusModule,
    AuthModule,
    UsuarioModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [
    AppController,
    RotasController,
    MotoristaController,
    OnibusController,
  ],
  providers: [AppService, RotasService, MotoristaService, OnibusService],
})
export class AppModule {}
