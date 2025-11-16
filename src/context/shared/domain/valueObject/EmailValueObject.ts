import { InvalidEmailAddressException } from 'src/context/auth/domain/exceptions/InvalidEmailAddressException';
import { ValueObject } from './ValueObject';

export class EmailValueObject extends ValueObject<string> {
  private static readonly EMAIL_PATTERN = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;

  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): void {
    if (!EmailValueObject.EMAIL_PATTERN.test(value)) {
      throw new InvalidEmailAddressException('Dirección de correo electrónico no válida');
    }
  }

  public static of(value: string): EmailValueObject {
    return new EmailValueObject(value);
  }
}
