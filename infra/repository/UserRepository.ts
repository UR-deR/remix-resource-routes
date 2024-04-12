import { IUserRepository } from '../../domain/user/UserRepository';
import { User } from '../../domain/user/user';
import { prismaClient } from '../PrismaClient';

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<void> {
    {
      await prismaClient.user.create({
        data: {
          id: user.id,
          email: user.email.value,
          name: user.name,
        },
      });
    }
  }

  async findById(id: User['id']): Promise<User | null> {
    {
      const user = await prismaClient.user.findUnique({
        where: { id },
      });
      if (!user) {
        return null;
      }
      return User.create(user.id, user.name, user.email);
    }
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    {
      const user = await prismaClient.user.findUnique({
        where: { email: email.value },
      });
      if (!user) {
        return null;
      }
      return User.create(user.id, user.name, user.email);
    }
  }

  async findAll(): Promise<User[]> {
    {
      const users = await prismaClient.user.findMany();
      return users.map((user) => User.create(user.id, user.name, user.email));
    }
  }
}
