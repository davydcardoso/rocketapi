import { Either, left, right } from "@core/logic/Either";
import { InvalidSessionValueError } from "./errors/InvalidSessionValueError";

export class Session {
  private readonly session: string;

  get value() {
    return this.session;
  }

  private constructor(session: string) {
    this.session = session;
  }

  static validate(session: string): boolean {
    if (!session || session.trim().length < 5 || session.trim().length > 255) {
      return false;
    }

    return true;
  }

  static create(session: string): Either<InvalidSessionValueError, Session> {
    if (!this.validate(session)) {
      return left(new InvalidSessionValueError());
    }

    return right(new Session(session));
  }
}
