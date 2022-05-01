import { Todo } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Header } from "../../components";
import ArrowBackIcon from "../../components/ArrowBackIcon";
import EditIcon from "../../components/EditIcon";
import TodoResolver from "../../resolvers/TodoResolver";

export type TodoPageProps = {
  todo: Todo | null;
};

const Todo: NextPage<TodoPageProps> = ({ todo }) => {
  const router = useRouter();
  const toTodosPage = () => {
    router.push("/todos");
  };
  const toEditPage = () => {
    router.push(`/edit-todo/${todo?.id}`);
  };
  return (
    <>
      <Header />
      <main className="flex h-full w-full items-center justify-center p-16 pt-40">
        <div className="w-[500px] min-w-max rounded-md bg-slate-800 p-4 text-center shadow-md shadow-gray-900">
          <span>Todo</span>
          <div className="w-full p-4">
            <div className="mb-4 flex flex-col gap-2">
              <label className="mb-2 block w-full text-left text-sm font-bold">
                Title
              </label>
              <p className="w-full p-4 focus:outline-none">
                {todo?.title || ""}{" "}
              </p>
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label className="mb-2 block w-full text-left text-sm font-bold">
                Description
              </label>
              <p
                className="w-full p-4 focus:outline-none"
                placeholder="add some description"
              >
                <span>{todo?.content || ""} </span>
              </p>
            </div>
            <div className="flex w-full flex-row items-center justify-between text-center">
              <button
                className="flex max-w-max gap-2 bg-blue-500 p-2 focus:outline-none"
                onClick={toTodosPage}
              >
                <ArrowBackIcon />
                Todos
              </button>
              <button
                className="flex max-w-max gap-2 bg-blue-700 p-2 focus:outline-none"
                onClick={toEditPage}
              >
                <EditIcon />
                Edit
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  if (session) {
    const todo = await TodoResolver.getTodo(String(params?.id));
    if (todo) {
      return {
        props: {
          todo: {
            ...todo,
            createdAt: JSON.stringify(todo.createdAt),
            updatedAt: JSON.stringify(todo.updatedAt),
          },
        },
      };
    }
  }
  return {
    props: {
      todo: null,
    },
  };
};

export default Todo;
