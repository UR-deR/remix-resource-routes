import { IPostRepository } from '../../domain/post/PostRepository';
import { User } from '../../domain/user/user';
import { Post } from '../../domain/post/post';
import { prismaClient } from '../PrismaClient';

export class PostRepository implements IPostRepository {
  async save(post: Post): Promise<void> {
    {
      await prismaClient.post.create({
        data: {
          id: post.id,
          title: post.title,
          content: post.content,
          published: post.published,
          authorId: post.userId,
        },
      });
    }
  }

  async findById(id: Post['id']): Promise<Post | null> {
    {
      const post = await prismaClient.post.findUnique({
        where: { id: id },
      });
      if (!post) {
        return null;
      }
      return Post.create(post.id, post.title, post.content, post.published, post.authorId);
    }
  }

  async findByAuthorId(authorId: User['id']): Promise<Post[]> {
    {
      const posts = await prismaClient.post.findMany({
        where: { authorId },
      });
      return posts.map((post) => Post.create(post.id, post.title, post.content, post.published, post.authorId));
    }
  }

  async findAll(): Promise<Post[]> {
    {
      const posts = await prismaClient.post.findMany();
      return posts.map((post) => Post.create(post.id, post.title, post.content, post.published, post.authorId));
    }
  }
}
