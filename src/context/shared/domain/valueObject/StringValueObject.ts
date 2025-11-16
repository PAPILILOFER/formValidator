import { InvalidArgumentError } from './InvalidArgumentError';
import { ValueObject } from './ValueObject';


export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value.trim());
  }

  protected validate(value: string): void {
    if (this.isEmptyOrWhitespace(value)) {
      throw new InvalidArgumentError(
        'El campo no debe estar vacío ni contener solo espacios en blanco'
      );
    }
  }

  private isEmptyOrWhitespace(value: string): boolean {
    return typeof value !== 'string' || value.trim().length === 0;
  }
}
