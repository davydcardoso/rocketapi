import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidSessionValueError extends Error implements DomainError {
  constructor() {
    super("The session valud is invalid");
    this.name = "InvalidSessionValueError";
  }
}
