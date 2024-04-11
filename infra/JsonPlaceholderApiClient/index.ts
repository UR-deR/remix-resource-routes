type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export class JsonPlaceHolderApiClient {
  private static readonly BASE_URL = 'https://jsonplaceholder.typicode.com';

  public async fetchTodos(): Promise<Todo[]> {
    const response = await fetch(`${JsonPlaceHolderApiClient.BASE_URL}/todos`);
    const todos = await response.json();
    return todos;
  }

  public async fetchTodoById(id: Todo['id']): Promise<Todo> {
    const response = await fetch(`${JsonPlaceHolderApiClient.BASE_URL}/todos/${id}`);
    const todo = await response.json();
    return todo;
  }
}
