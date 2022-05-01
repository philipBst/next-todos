import { User } from "@prisma/client";
import { prisma } from "../config/prisma";

export class UserResolver {
  async getUser(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}

const userResolver = new UserResolver();

export default userResolver;
