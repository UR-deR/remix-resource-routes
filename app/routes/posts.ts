import { PostRepository } from '../../infra/repository/PostRepository';

export async function loader() {
  const postRepository = new PostRepository();

  const posts = await postRepository.findAll();

  return new Response(
    JSON.stringify({
      posts,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
