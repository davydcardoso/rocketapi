import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

interface ITicketProps {
  id?: string;
  status: string;
  unread_messages: string;
  last_message: string;
  is_group: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class Ticket extends Entity<ITicketProps> {
  get status() {
    return this.props.status;
  }

  get unread_messages() {
    return this.props.unread_messages;
  }

  get last_message() {
    return this.props.last_message;
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

  private constructor(props: ITicketProps, id?: string) {
    super(props, id);
  }

  static create(props: ITicketProps, id?: string): Either<Error, Ticket> {
    const ticket = new Ticket(props, id);

    return right(ticket);
  }
}
