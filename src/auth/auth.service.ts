import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(login: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.findByLogin(login);

    if (!usuario || usuario.senha !== senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return usuario;
  }

  async login(usuario: Usuario) {
    const payload = { login: usuario.login, id: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
