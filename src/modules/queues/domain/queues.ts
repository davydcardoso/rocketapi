import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

interface IQueuesProps {
  id?: string;
  name: string;
  color: string;
  greeting_message: string;
  created_at: Date;
  updated_at: Date;
}

export class Queues extends Entity<IQueuesProps> {
  get name() {
    return this.props.name;
  }

  get color() {
    return this.props.color;
  }

  get greeting_message() {
    return this.props.greeting_message;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private constructor(props: IQueuesProps, id?: string) {
    super(props, id);
  }

  static create(props: IQueuesProps, id?: string): Either<Error, Queues> {
    const queues = new Queues(props, id);

    return right(queues);
  }
}
