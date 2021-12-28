import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class UserDoesNotHavePermissionError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("User does not have permission");
    this.name = "UserDoesNotHavePermissionError";
  }
}
