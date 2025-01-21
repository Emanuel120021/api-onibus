import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as CryptoJS from 'crypto-js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() { login, senha }: { login: string; senha: string }) {
    const senhaMd5 = CryptoJS.MD5(senha).toString(CryptoJS.enc.Hex);
    const usuario = await this.authService.validarUsuario(login, senhaMd5);
    return this.authService.login(usuario);
  }
}
