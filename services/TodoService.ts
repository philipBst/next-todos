export type TodoPayload = {
  title: string;
  content: string;
};

export const postTodo = async (todo: TodoPayload) => {
  const response = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const updateTodo = async (todo: TodoPayload & { id: string }) => {
  const response = await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};
