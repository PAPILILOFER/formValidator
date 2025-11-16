import { User } from '../aggregates/UserAggregate';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null>;
}
