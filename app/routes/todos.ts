import { JsonPlaceHolderApiClient } from '../../infra/JsonPlaceholderApiClient';

export async function loader() {
  const jsonPlaceHolderApiClient = new JsonPlaceHolderApiClient();
  const todos = await jsonPlaceHolderApiClient.fetchTodos();

  return new Response(
    JSON.stringify({
      todos,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
