import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() { login, senha }: { login: string; senha: string }) {
    const usuario = await this.authService.validarUsuario(login, senha);
    return this.authService.login(usuario);
  }
}
