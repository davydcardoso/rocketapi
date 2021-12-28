import { Controller } from "@core/infra/Controller";
import { PrismaSettingsRepository } from "@modules/settings/repositories/prisma/PrismaSettingsRepository";
import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { RegisterUserAccount } from "@modules/users/useCases/RegisterUserAccount/RegisterUserAccount";
import { RegisterUserAccountController } from "@modules/users/useCases/RegisterUserAccount/RegisterUserAccountController";

export function makeRegisterUserAccountControllerFactory(): Controller {
  const prismaSettingsRepository = new PrismaSettingsRepository();
  const prismaUserRepository = new PrismaUsersRepository();

  const registerUserAccount = new RegisterUserAccount(prismaUserRepository);

  const registerUserAccountController = new RegisterUserAccountController(
    prismaSettingsRepository,
    registerUserAccount
  );

  return registerUserAccountController;
}
