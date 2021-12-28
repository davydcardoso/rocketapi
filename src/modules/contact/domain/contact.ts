import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

interface IContactProps {
  id?: string;
  name: string;
  number: string;
  email: string;
  profile_pic_url: string;
  is_group: boolean;
  created_at: Date;
  updated_at?: Date;
}

export class Contact extends Entity<IContactProps> {
  get name() {
    return this.props.name;
  }

  get number() {
    return this.props.number;
  }

  get email() {
    return this.props.email;
  }

  get profile_pic_url() {
    return this.props.profile_pic_url;
  }

  get is_group() {
    return this.props.is_group;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private constructor(props: IContactProps, id?: string) {
    super(props, id);
  }

  static create(props: IContactProps, id?: string): Either<Error, Contact> {
    const contact = new Contact(props, id);

    return right(contact);
  }
}
