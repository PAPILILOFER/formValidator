import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/UserRepository';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(usernameOrEmail: string, password: string) {
    const user = await this.userRepository.findByUsernameOrEmail(usernameOrEmail);

    if (!user) {
      throw new UnauthorizedException('Usuario o correo no existe');
    }


    if (user.password.value !== password) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return {
      message: 'Login exitoso',
      userId: user.id.value,
      userName: user.userName.value,
      email: user.email.value,
    };
  }
}
