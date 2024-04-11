import { LoaderFunctionArgs } from '@remix-run/node';
import { JsonPlaceHolderApiClient } from '../../infra/JsonPlaceholderApiClient/index';

const badRequestResponse = new Response('Bad Request', { status: 400, statusText: 'Bad Request' });

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    return badRequestResponse;
  }

  const id = Number(params.id);

  if (isNaN(id)) {
    return badRequestResponse;
  }

  const jsonPlaceHolderApiClient = new JsonPlaceHolderApiClient();
  const todo = await jsonPlaceHolderApiClient.fetchTodoById(id);

  return new Response(JSON.stringify(todo), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
