import { DomainException } from '../exception';
import { Email } from './email';

export class User {
  private constructor(public readonly id: number, public readonly name: string, public readonly email: Email) {}

  static create(id: number, name: string, email: string): User {
    if (name === '') {
      throw new DomainException('Name must not be empty');
    }

    return new User(id, name, new Email(email));
  }

  private copy({ id = this.id, name = this.name, email = this.email }): User {
    return new User(id, name, email);
  }

  public changeName(name: string): User {
    return this.copy({ name });
  }
}
