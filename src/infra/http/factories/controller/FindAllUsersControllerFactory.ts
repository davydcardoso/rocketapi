import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { FindAllUsers } from "@modules/users/useCases/FindAllUsers/FindAllUsers";
import { FindAllUsersController } from "@modules/users/useCases/FindAllUsers/FindAllUsersController";

export function makeFindAllUsersControllerFactory(): Controller {
  const prismaUserRepository = new PrismaUsersRepository();

  const findAllUsers = new FindAllUsers(prismaUserRepository);

  const findAllUsersController = new FindAllUsersController(findAllUsers);

  return findAllUsersController;
}
