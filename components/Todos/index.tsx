import { Todo } from "@prisma/client";
import Link from "next/link";
import { FunctionComponent } from "react";
import TodoItem from "../Todo";

export type TodosProps = {
  todos: Todo[];
};

const Todos: FunctionComponent<TodosProps> = ({ todos }) => (
  <div className="min-w-max rounded-md bg-slate-800 p-4 shadow-md shadow-gray-900">
    <div className="mb-8 flex items-center justify-between gap-8 text-xl">
      <span className="min-w-max rounded bg-gray-700 p-1">Your Todos</span>
      <button className="min-w-max rounded-md bg-blue-600 p-2 text-sm capitalize hover:bg-blue-700">
        <Link href="/create-todo">add todo</Link>
      </button>
    </div>
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </div>
);

export default Todos;
