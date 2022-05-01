import { Todo } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import TodoResolver from "../../resolvers/TodoResolver";

import { Header, Todos as TodoItems } from "../../components";

export type TodosPageProps = {
  todos: Todo[];
};

const Todos: NextPage<TodosPageProps> = ({ todos }) => {
  return (
    <>
      <Header />
      <main className="flex h-full w-full items-center justify-center p-16 pt-40 ">
        <TodoItems todos={todos} />
      </main>
    </>
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
