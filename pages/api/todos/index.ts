import { Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import TodoResolver from "../../../resolvers/TodoResolver";
import UserResolver from "../../../resolvers/UserResolver";

export type TodoPayload = {
  id: string;
  title: string;
  content: string | null;
  authorId: string | null;
  createdAt: string;
  updatedAt: string;
};

type Data =
  | {
      name: string;
    }
  | string
  | TodoPayload;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });
  if (session) {
    if (req.body) {
      const user = await UserResolver.getUser(session.user?.email || "");
      if (user) {
        const todo: Todo = {
          ...req.body,
          authorId: user.id,
          id: String((Math.random() * 100000).toFixed(0)),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const resp = await TodoResolver.createTodo(todo);
        if (resp) {
          const data = {
            ...resp,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
          };
          res.status(200).json(data);
        }
      }
    }
  } else {
    res.status(404).send("Invalid");
  }
}
