type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function getTodos(): Promise<Todo[]> {
  // 💡 Updated the endpoint to fetch todos
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}
