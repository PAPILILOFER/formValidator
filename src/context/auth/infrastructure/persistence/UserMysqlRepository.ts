// src/context/user/infrastructure/UserMysqlRepository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserEntity } from '../entities/userEntity';
import { User } from '../../domain/aggregates/UserAggregate';

@Injectable()
export class UserMysqlRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity, 'mysql')
    private readonly repo: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<void> {
    const primitives = user.toPrimitives();

    const entity = this.repo.create({
      id: primitives.id,
      userName: primitives.userName,
      email: primitives.userEmail,
      password: primitives.password,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    });

    await this.repo.save(entity);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;

    return User.fromPrimitives({
      id: entity.id,
      userName: entity.userName,
      userEmail: entity.email,
      password: entity.password,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    });
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    const entity = await this.repo.findOne({
      where: [{ userName: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!entity) return null;

    return User.fromPrimitives({
      id: entity.id,
      userName: entity.userName,
      userEmail: entity.email,
      password: entity.password,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    });
  }
}

export const userRepositoryProvider = {
  provide: UserRepository,
  useClass: UserMysqlRepository,
};
