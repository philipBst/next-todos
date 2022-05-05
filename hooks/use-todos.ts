import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Todo } from "@prisma/client";
import { useEffect } from "react";
import { useState } from "react";
import { isEmptyArray, not } from "../utils/data-utils";
import { useCallback } from "react";

export type UseTodosProps = {
  todos: Todo[];
};

export function useTodos({ todos }: UseTodosProps) {
  const [data, setData] = useState<Todo[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (not(isEmptyArray(todos))) {
      setData(todos);
    }
  }, [todos]);

  const toHomePage = useCallback(
    function () {
      router.push("/");
    },
    [router]
  );

  const toEditTodoPage = useCallback(
    function (id: string | number) {
      router.push(`/edit-todo/${id}`);
    },
    [router]
  );

  return { data, session, router, toHomePage, toEditTodoPage };
}
