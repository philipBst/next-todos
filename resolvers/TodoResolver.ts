import { Todo } from "@prisma/client";
import { prisma } from "../config/prisma";
import { Optional } from "../types/utility-types";

export class TodoResolver {
  async getAllTodos(): Promise<Todo[]> {
    return await prisma.todo.findMany();
  }

  async getAllTodosOf(email: Optional<string>): Promise<Todo[]> {
    if (email) {
      return await prisma.todo.findMany({
        where: {
          author: {
            email,
          },
        },
      });
    } else {
      return [];
    }
  }

  async createTodo(todo: Todo) {
    return await prisma.todo.create({
      data: {
        ...todo,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      },
    });
  }

  async updateTodo(id: string, todo: Todo) {
    return await prisma.todo.update({
      where: {
        id,
      },
      data: todo,
    });
  }
}

const todoResolver = new TodoResolver();

export default todoResolver;
