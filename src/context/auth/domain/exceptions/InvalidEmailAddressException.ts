import { DomainException } from 'src/context/shared/domain/DomainException';

export class InvalidEmailAddressException extends DomainException {
  constructor(public readonly message: string) {
    super(message);
  }
}
