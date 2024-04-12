import { User } from './user';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: User['id']): Promise<User | null>;
  findByEmail(email: User['email']): Promise<User | null>;
  findAll(): Promise<User[]>;
}
