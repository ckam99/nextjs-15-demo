import { getTodos } from "@/lib/test/todos";




export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <div>
      <h1>Todos List</h1>
      <ul>
        {todos.slice(0, 10).map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "black",
            }}
          >
            {todo.title}
            {todo.completed ? " (Completed)" : " (Pending)"}
          </li>
        ))}
      </ul>
      <p>
        Displaying {todos.slice(0, 10).length} of {todos.length} total todos
        from JSONPlaceholder.
      </p>
    </div>
  );
}