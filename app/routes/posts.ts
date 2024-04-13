import { PostRepository } from '../../infra/repository/PostRepository';
import type { ActionFunctionArgs } from '@remix-run/node';
import { RegisterPostUsecase } from '../../usecase/RegisterPostUsecase';

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

export const action = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case 'POST': {
      //TODO: Implement request validator module
      const requestBody = await request.json();
      const { id, title, content, published, userId } = requestBody;

      const registerPostUsecase = new RegisterPostUsecase(new PostRepository());
      const result = await registerPostUsecase.do({ id, title, content, published, userId });

      if (result.isOk()) {
        return new Response(
          JSON.stringify({
            message: 'Post created successfully',
          }),
          {
            status: 201,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            message: 'Failed to create post',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    case 'PUT': {
      /* handle "PUT" */
      //do nothing
      break;
    }
    case 'PATCH': {
      /* handle "PATCH" */
      //do nothing
      break;
    }
    case 'DELETE': {
      /* handle "DELETE" */
      //do nothing
      break;
    }
    default: {
      console.log(request);

      return new Response('Method Not Allowed', { status: 405, statusText: 'Method Not Allowed' });
    }
  }
};
