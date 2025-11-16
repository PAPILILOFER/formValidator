import { Controller, Body, Post } from '@nestjs/common';
import { UserCreatorUseCase } from '../../application/UserCreator.use-case';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('create')
export class UserCreatorController {
  constructor(private readonly creator: UserCreatorUseCase) {}

  @Post('users')
  async register(@Body() dto: CreateUserDto) {
    return this.creator.run(dto.userName, dto.userEmail, dto.password);
  }
}
