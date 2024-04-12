import { DomainException } from '../exception';
import { User } from '../user/user';

type UserId = User['id'];

export class Post {
  private constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
    public readonly published: boolean,
    public readonly userId: UserId
  ) {}

  //TODO: impl Title Value Object

  static create(id: number, title: string, content: string, published: boolean, userId: UserId): Post {
    if (title === '') {
      throw new DomainException('Title is required');
    }

    return new Post(id, title, content, published, userId);
  }

  private copy({
    id = this.id,
    title = this.title,
    content = this.content,
    published = this.published,
    userId = this.userId,
  }): Post {
    return new Post(id, title, content, published, userId);
  }

  public changeTitle(title: string): Post {
    return this.copy({ title });
  }

  public publish(): Post {
    return this.copy({ published: true });
  }

  public unpublish(): Post {
    return this.copy({ published: false });
  }
}
