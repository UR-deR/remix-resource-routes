import { LoaderFunctionArgs } from '@remix-run/node';
import { PostRepository } from '../../infra/repository/PostRepository';
import { UserRepository } from '../../infra/repository/UserRepository';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    return new Response('Bad Request', { status: 400, statusText: 'Bad Request' });
  }

  const id = Number(params.id);

  if (isNaN(id)) {
    return new Response('Bad Request', { status: 400, statusText: 'Bad Request' });
  }

  const postRepository = new PostRepository();

  const post = await postRepository.findById(id);

  if (!post) {
    return new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }

  const authorId = post.userId;

  const userRepository = new UserRepository();

  const author = await userRepository.findById(authorId);

  if (!author) {
    return new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }

  return new Response(
    JSON.stringify({
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      author: {
        id: authorId,
        name: author.name,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
