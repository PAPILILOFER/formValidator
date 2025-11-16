import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserMysqlRepository,
  userRepositoryProvider,
} from './persistence/UserMysqlRepository';
import { UserEntity } from './entities/userEntity';
import { UserCreatorController } from './controller/UserCreatorController';
import { UserCreatorUseCase } from '../application/UserCreator.use-case';
import { UserRepository } from '../domain/repositories/UserRepository';
import { AuthController } from './controller/AuthController';
import { LoginUserUseCase } from '../application/LoginUser.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], 'mysql')],
  providers: [UserMysqlRepository, UserCreatorUseCase,LoginUserUseCase,userRepositoryProvider],
  controllers: [UserCreatorController,AuthController],
  exports: [UserRepository],
})
export class AuthModule {}
