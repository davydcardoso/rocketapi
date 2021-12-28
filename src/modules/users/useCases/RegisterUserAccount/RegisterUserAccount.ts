import { Either, left, right } from "@core/logic/Either";
import { Email } from "@modules/users/domain/email";
import { InvalidEmailError } from "@modules/users/domain/errors/InvalidEmailError";
import { InvalidNameValueError } from "@modules/users/domain/errors/InvalidNameValueError";
import { InvalidPasswordLengthError } from "@modules/users/domain/errors/InvalidPasswordLengthError";
import { Name } from "@modules/users/domain/name";
import { Password } from "@modules/users/domain/password";
import { Users } from "@modules/users/domain/users";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { v4 } from "uuid";
import { AccountAlreadyExistsError } from "./errors/AccountAlreadyExistsError";

type RegisterUserAccountRequest = {
  email: string;
  password: string;
  name: string;
  profile: string;
  queueIds: [string] | null;
};

type RegisterUserAccountResponse = Either<Error, Object>;

export class RegisterUserAccount {
  constructor(private usersRepository: IUsersRepository) {}

  async perform({
    name,
    email,
    password,
    profile,
    queueIds,
  }: RegisterUserAccountRequest): Promise<RegisterUserAccountResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (nameOrError.isLeft()) {
      return left(new InvalidNameValueError(name));
    }

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(email));
    }

    if (passwordOrError.isLeft()) {
      return left(new InvalidPasswordLengthError());
    }

    const userOrError = Users.create({
      id: v4(),
      name: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      profile: profile,
      token_version: 0,
      created_at: new Date(),
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const userAlreadyExists = await this.usersRepository.exists(
      user.email.value
    );

    if (userAlreadyExists) {
      return left(new AccountAlreadyExistsError(user.email.value));
    }

    return right(user);
  }
}
