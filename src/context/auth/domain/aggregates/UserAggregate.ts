import { Uuid } from 'src/context/shared/domain/valueObject/Uuid';
import { UserName } from '../valueObjects/user/UserName';
import { AggregateRoot } from 'src/context/shared/domain/AggregateRoot';

import { UserPassword } from '../valueObjects/user/UserPassword';
import { UserEmail } from '../valueObjects/user/UserEmail';

export interface UserPrimitives {
  id: string;
  userName: string;
  userEmail: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export class User extends AggregateRoot {
  constructor(
    private readonly _id: Uuid,
    private _userName: UserName,
    private _userEmail: UserEmail,
    private _password: UserPassword,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {
    super();
  }

  static create(
    id: Uuid,
    userName: UserName,
    email: UserEmail,
    password: UserPassword,
  ): User {
    const now = new Date();

    return new User(id, userName, email, password, now, now);
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this._id.value,
      userName: this._userName.value,
      userEmail: this._userEmail.value,
      password: this._password.value,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    };
  }

  static fromPrimitives(plain: UserPrimitives): User {
    return new User(
      new Uuid(plain.id),
      new UserName(plain.userName),
      new UserEmail(plain.userEmail),
      new UserPassword(plain.password),
      new Date(plain.createdAt),
      new Date(plain.updatedAt),
    );
  }

  // GETTERS
  get id(): Uuid {
    return this._id;
  }

  get userName(): UserName {
    return this._userName;
  }

  get email(): UserEmail {
    return this._userEmail;
  }

  get password(): UserPassword {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
