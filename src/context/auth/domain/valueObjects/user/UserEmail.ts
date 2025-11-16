import { EmailValueObject } from 'src/context/shared/domain/valueObject/EmailValueObject';
import { UserException } from '../../exceptions/UserException';

export class UserEmail extends EmailValueObject {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new UserException('El correo electrónico es obligatorio.');
    }
    if (value.length < 14 || value.length > 255) {
      throw new UserException(
        'El correo electrónico debe tener entre 14 y 255 caracteres.',
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new UserException('El correo electrónico ingresado no es válido.');
    }
  }
}
