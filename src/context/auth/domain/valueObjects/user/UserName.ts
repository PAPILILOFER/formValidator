import { StringValueObject } from 'src/context/shared/domain/valueObject/StringValueObject';
import { UserException } from '../../exceptions/UserException';

export class UserName extends StringValueObject {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new UserException('El nombre de usuario es obligatorio.');
    }
  }
}
