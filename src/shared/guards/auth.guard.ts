import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger('AuthGuard');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req) {
      if (req.headers.authorization) {
        req.usuario = await this.validarToken(req.headers.authorization);
        return true;
      }
    }
    return false;
  }

  async validarToken(auth: string): Promise<string | object> {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException(
        'No estas autorizado para este recurso',
        HttpStatus.FORBIDDEN,
      );
    }
    const token = auth.split(' ')[1];
    try {
      const decode: string | object = jwt.verify(token, process.env.SECRET);
      return decode;
    } catch (err) {
      throw new HttpException(
        'No estas autorizado para este recurso 2',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
