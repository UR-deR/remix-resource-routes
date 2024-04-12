import { User } from '../user/user';
import { Post } from './post';

export interface IPostRepository {
  save(post: Post): Promise<void>;
  findById(id: Post['id']): Promise<Post | null>;
  findByAuthorId(userId: User['id']): Promise<Post[]>;
  findAll(): Promise<Post[]>;
}
