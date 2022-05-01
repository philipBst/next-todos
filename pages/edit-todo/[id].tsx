import { Todo } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, FormEvent } from "react";

import { Header } from "../../components";
import TodoResolver from "../../resolvers/TodoResolver";
import { updateTodo } from "../../services/TodoService";

export type EditTodoProps = {
  todo: Todo | null;
};

const EditTodo: NextPage<EditTodoProps> = ({ todo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.content || "");
    }
  }, [todo]);

  if (!todo) {
    router.push("/");
  }

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      updateTodo({
        id: todo!.id,
        title,
        content: description,
      });
    },
    [todo, title, description]
  );

  const handleTitleChange = useCallback((e: FormEvent) => {
    setTitle((e.target as HTMLInputElement).value);
  }, []);

  const handleDescriptionChange = useCallback((e: FormEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  }, []);
  return (
    <>
      <Header />
      <main className="flex h-full w-full items-center justify-center p-16 pt-40">
        <div className="w-[500px] min-w-max rounded-md bg-slate-800 p-4 text-center shadow-md shadow-gray-900">
          <span>Todo</span>
          <form className="w-full p-4" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-2">
              <label className="mb-2 block w-full text-left text-sm font-bold">
                Title
              </label>
              <input
                type="text"
                className="w-full p-4 text-black focus:outline-none"
                placeholder="eg. Todo 1"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label className="mb-2 block w-full text-left text-sm font-bold">
                Description
              </label>
              <textarea
                className="w-full p-4 text-black focus:outline-none"
                placeholder="add some description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <button
                type="submit"
                className="max-w-max bg-green-500 p-2 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>
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
            createdAt: todo.createdAt.toISOString(),
            updatedAt: todo.updatedAt.toISOString(),
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

export default EditTodo;
