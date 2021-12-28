import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class SettingsNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("System settings not found");
    this.name = "SettingsNotFoundError";
  }
}
