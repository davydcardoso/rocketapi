import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class UserCreationDisabledError extends Error implements UseCaseError {
  constructor() {
    super("Account creation disabled");
    this.name = "UserCreationDisabledError";
  }
}
