import { v4 as uuid, validate as uuidValidate } from 'uuid';
import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from './InvalidArgumentError';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }
  protected validate(): void {}
  static random(): Uuid {
    return new Uuid(uuid());
  }

  static IsValid(uuid: string): boolean {
    return uuidValidate(uuid);
  }

  private ensureIsValidUuid(id: string): void {
    if (!uuidValidate(id)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> no permite el valor <${id}>`,
      );
    }
  }
}
