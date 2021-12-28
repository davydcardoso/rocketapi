import {
  Users as PersistenceUsers,
  Queues as PersistenceQueues,
  Tickets as PersistenceTickets,
} from "@prisma/client";
import { Email } from "../domain/email";
import { Name } from "../domain/name";
import { Password } from "../domain/password";
import { Users } from "../domain/users";
import { UsersWithDetails } from "../dtos/UsersWithDetails";

type PersistenceRaw = PersistenceUsers & {
  queues: PersistenceQueues[];
};

export class UsersMapper {
  static toDto(raw: PersistenceRaw): UsersWithDetails {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      profile: raw.profile,
      token_version: raw.token_version,
      queues: raw.queues,
    };
  }

  static toDomain(raw: PersistenceUsers): Users {
    const nameOrError = Name.create(raw.name);
    const emailOrError = Email.create(raw.email);
    const passwordOrError = Password.create(raw.password);

    if (nameOrError.isLeft()) {
      throw new Error("The name is invalid");
    }

    if (emailOrError.isLeft()) {
      throw new Error("The email is invalid");
    }

    if (passwordOrError.isLeft()) {
      throw new Error("The password is invalid");
    }

    const userOrError = Users.create({
      id: raw.id,
      name: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      profile: raw.profile,
      token_version: raw.token_version,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });

    if (userOrError.isRight()) {
      return userOrError.value;
    }

    return null;
  }

  static async toPersistence(user: Users) {
    return {
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      password: await user.password.getHashedValue(),
      token_version: user.token_version,
      profile: user.profile,
      created_at: user.created_at,
    };
  }
}
