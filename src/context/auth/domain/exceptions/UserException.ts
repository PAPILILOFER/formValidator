import { DomainException } from 'src/context/shared/domain/DomainException';

export class UserException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
