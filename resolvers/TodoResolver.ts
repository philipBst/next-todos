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

  async getTodo(id: Optional<string>) {
    if (id) {
      return await prisma.todo.findUnique({
        where: {
          id,
        },
      });
    }
  }

  async createTodo(todo: Todo) {
    return await prisma.todo.create({
      data: todo,
    });
  }

  async updateTodo(id: string, todo: Todo) {
    if (id) {
      return await prisma.todo.update({
        where: {
          id,
        },
        data: todo,
      });
    }
  }

  async deleteTodo(id: string) {
    return await prisma.todo.delete({
      where: {
        id,
      },
    });
  }
}

const todoResolver = new TodoResolver();

export default todoResolver;
