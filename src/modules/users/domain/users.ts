import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";
import { Email } from "./email";
import { Name } from "./name";
import { Password } from "./password";

interface IUsersProps {
  id?: string;
  name: Name;
  email: Email;
  password: Password;
  token_version: number;
  profile: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Users extends Entity<IUsersProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get token_version() {
    return this.props.token_version;
  }

  get password() {
    return this.props.password;
  }

  get profile() {
    return this.props.profile;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private constructor(props: IUsersProps, id?: string) {
    super(props, id);
  }

  static create(props: IUsersProps, id?: string): Either<Error, Users> {
    const user = new Users(props, id);

    return right(user);
  }
}
