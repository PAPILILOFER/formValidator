import { InvalidArgumentError } from './InvalidArgumentError';

export type Primitives = string | number | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.ensureValueIsDefined(value);
    this.validate(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> este valor es requerido`,
      );
    }
  }

  protected abstract validate(value: T): void;

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }

  getValue(): T {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}
