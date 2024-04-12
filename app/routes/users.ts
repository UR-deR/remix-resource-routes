import { UserRepository } from '../../infra/repository/UserRepository';

export async function loader() {
  const userRepository = new UserRepository();

  const users = await userRepository.findAll();

  return new Response(
    JSON.stringify({
      users,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
