import { Todo } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

import TodoResolver from "../../resolvers/TodoResolver";

import { Header, Todos as TodoItems } from "../../components";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

export type TodosPageProps = {
  todos: Todo[];
};

export type TodoContextValues = {
  todos: Todo[];
  deleteTodoOfID: (arg: string | number) => void;
};

export const TodoContext = createContext<TodoContextValues | null>(null);

const Todos: NextPage<TodosPageProps> = ({ todos }) => {
  const [data, setData] = useState<Todo[]>(() => todos);

  const { data: session } = useSession();

  const router = useRouter();

  const deleteTodoOfID = useCallback((id: string | number) => {
    setData((prevData) =>
      prevData.filter((todo) => String(todo.id) !== String(id))
    );
  }, []);

  const values: TodoContextValues = useMemo(
    () => ({
      todos: data,
      deleteTodoOfID,
    }),
    [data, deleteTodoOfID]
  );

  return (
    <TodoContext.Provider value={values}>
      <Header />
      <main className="flex h-full w-full items-center justify-center p-16 pt-40 ">
        {session ? (
          <TodoItems todos={data} />
        ) : (
          <button
            onClick={() => router.push("/")}
            className="rounded-md bg-blue-600 px-4 py-2"
          >
            Go to Home Page
          </button>
        )}
      </main>
    </TodoContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session && session.user?.email) {
    const todos = (await TodoResolver.getAllTodosOf(session.user?.email)).map(
      (todo) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      })
    );
    return {
      props: {
        todos,
      },
    };
  }
  return {
    props: {
      todos: [],
    },
  };
};

export default Todos;
