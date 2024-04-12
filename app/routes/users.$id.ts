import { LoaderFunctionArgs } from '@remix-run/node';
import { UserRepository } from '../../infra/repository/UserRepository';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    return new Response('Bad Request', { status: 400, statusText: 'Bad Request' });
  }

  const id = Number(params.id);

  if (isNaN(id)) {
    return new Response('Bad Request', { status: 400, statusText: 'Bad Request' });
  }

  const userRepository = new UserRepository();

  const user = await userRepository.findById(id);

  if (!user) {
    return new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }

  return new Response(
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email.value,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
