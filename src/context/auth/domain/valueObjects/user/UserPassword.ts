import { StringValueObject } from 'src/context/shared/domain/valueObject/StringValueObject';
import { InvalidArgumentError } from 'src/context/shared/domain/valueObject/InvalidArgumentError';

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidPassword(value);
  }

  private ensureIsValidPassword(value: string): void {
    if (value.length < 8) {
      throw new InvalidArgumentError(
        'La contraseña debe tener al menos 8 caracteres.',
      );
    }

    if (!/[A-Z]/.test(value)) {
      throw new InvalidArgumentError(
        'La contraseña debe contener al menos una letra mayúscula.',
      );
    }

    if (!/[0-9]/.test(value)) {
      throw new InvalidArgumentError(
        'La contraseña debe contener al menos un número.',
      );
    }
  }
}
