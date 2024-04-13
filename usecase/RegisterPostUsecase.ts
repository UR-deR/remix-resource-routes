import { IPostRepository } from '../domain/post/PostRepository';
import { Post } from '../domain/post/post';
import { ok, err, Result } from 'neverthrow';

type Params = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  userId: number;
};

export class RegisterPostUsecase {
  constructor(private postRepository: IPostRepository) {}
  async do(params: Params): Promise<Result<void, Error>> {
    try {
      const { id, title, content, published, userId } = params;
      const post = Post.create(id, title, content, published, userId);
      await this.postRepository.save(post);
      return ok(undefined);
    } catch (error: Error | unknown) {
      console.error(error);
      return err(error as Error);
    }
  }
}
