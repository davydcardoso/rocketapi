import { prisma } from "@infra/prisma/connection";
import { Users } from "@modules/users/domain/users";
import { UsersWithDetails } from "@modules/users/dtos/UsersWithDetails";
import { UsersMapper } from "@modules/users/mappers/UsersMapper";
import { IUsersRepository } from "../IUsersRepository";

interface FindManyProps {
  searchParam?: string;
  pageNumber?: string | number;
}

interface FindManyPropsResponse {
  users: UsersWithDetails[];
  count: number;
  hasMore: boolean;
}

export class PrismaUsersRepository implements IUsersRepository {
  async create(user: Users): Promise<void> {
    const data = await UsersMapper.toPersistence(user);

    await prisma.users.create({ data });
  }

  async exists(email: string): Promise<boolean> {
    const userExists = await prisma.users.findUnique({ where: { email } });

    return !!userExists;
  }

  async findManyAndCount({
    pageNumber,
    searchParam,
  }: FindManyProps): Promise<FindManyPropsResponse> {
    const limit = 20;
    const offset = limit * (+pageNumber - 1);

    const count = await prisma.users.count();

    const users = await prisma.users.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchParam.toLowerCase(),
            },
          },
          {
            email: {
              contains: searchParam.toLowerCase(),
            },
          },
        ],
      },
      take: 20,
      skip: offset,
      include: {
        queues: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const hasMore = count > offset + users.length;

    return {
      users: users,
      count: count,
      hasMore,
    };
  }
}
