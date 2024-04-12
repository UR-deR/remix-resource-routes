import { DomainException } from '../exception';

export class Email {
  public readonly value: string;
  constructor(public readonly _value: string) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(_value)) {
      throw new DomainException('Invalid email');
    }
    this.value = _value;
  }
}
