import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/UserRepository';
import { User } from '../domain/aggregates/UserAggregate';
import { Uuid } from 'src/context/shared/domain/valueObject/Uuid';
import { UserName } from '../domain/valueObjects/user/UserName';

import { UserPassword } from '../domain/valueObjects/user/UserPassword';
import { UserEmail } from '../domain/valueObjects/user/UserEmail';

@Injectable()
export class UserCreatorUseCase {
  constructor(private readonly users: UserRepository) {}

  async run(userName: string, email: string, password: string) {
    const user = User.create(
      Uuid.random(),
      new UserName(userName),
      new UserEmail(email),
      new UserPassword(password),
    );

    await this.users.save(user);

    return user.toPrimitives();
  }
}
