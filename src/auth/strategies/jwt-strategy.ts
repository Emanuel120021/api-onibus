import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usuarioService: UsuarioService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_TOKEN'),
    });
  }

  async validate(payload: any) {
    const usuario = await this.usuarioService.findByLogin(payload.login);

    if (!usuario) {
      throw new UnauthorizedException();
    }

    return usuario;
  }
}
