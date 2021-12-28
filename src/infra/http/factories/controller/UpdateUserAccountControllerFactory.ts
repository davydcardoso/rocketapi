import { Controller } from "@core/infra/Controller";
import { UpdateUserAccount } from "@modules/users/useCases/UpdateUserAccount/UpdateUserAccount";
import { UpdateUserAccountController } from "@modules/users/useCases/UpdateUserAccount/UpdateUserAccountController";

export function makeUpdateUserAccountControllerFactory(): Controller {
  const updateUserAccount = new UpdateUserAccount();

  const updateUserAccountController = new UpdateUserAccountController(
    updateUserAccount
  );

  return updateUserAccountController;
}
