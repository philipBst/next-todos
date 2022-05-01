import { Todo } from "@prisma/client";
import Link from "next/link";

import DeleteIcon from "../DeleteIcon";
import EditIcon from "../EditIcon";

export type TodoProps = {
  todo: Todo;
};

const Todo = ({ todo }: TodoProps) => {
  return (
    <div className=" flex w-[500px] items-center justify-between py-3 last:border-none odd:border-b-2 odd:border-b-gray-600 even:border-b-2 even:border-b-gray-600">
      <span className="capitalize">
        <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
      </span>
      <aside className="flex items-center justify-between gap-8">
        <EditIcon className="h-5 w-5 cursor-pointer fill-blue-700" />
        <DeleteIcon className="h-5 w-5 cursor-pointer fill-red-700" />
      </aside>
    </div>
  );
};

export default Todo;
