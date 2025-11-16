// src/context/user/infrastructure/controllers/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';

import { LoginDto } from '../dto/login.dto';
import { LoginUserUseCase } from '../../application/LoginUser.use-case';


@Controller('login')
export class AuthController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    const { usernameOrEmail, password } = loginDto;
    return this.loginUserUseCase.execute(usernameOrEmail, password);
  }
}
