import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";
import { Queues } from "@prisma/client";
import { InvalidNameError } from "./errors/InvalidNameError";
import { InvalidSessionValueError } from "./errors/InvalidSessionValueError";
import { Name } from "./name";
import { Session } from "./session";

interface IWhatsappProps {
  id?: string;
  name: Name;
  session: Session;
  qrcode: string;
  status: string;
  battery: string;
  plugged: boolean;
  retries: number;
  greeting_message: string;
  farewell_message: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
  queue?: Queues[] | Queues;
}

export class Whatsapp extends Entity<IWhatsappProps> {
  get name() {
    return this.props.name;
  }

  get session() {
    return this.props.session;
  }

  get qrcode() {
    return this.props.qrcode;
  }

  get status() {
    return this.props.status;
  }

  get battery() {
    return this.props.battery;
  }

  get plugged() {
    return this.props.plugged;
  }

  get retries() {
    return this.props.retries;
  }

  get greeting_message() {
    return this.props.greeting_message;
  }

  get farewell_message() {
    return this.props.farewell_message;
  }

  get is_default() {
    return this.props.is_default;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private constructor(props: IWhatsappProps, id?: string) {
    super(props, id);
  }

  static create(
    props: IWhatsappProps,
    id?: string
  ): Either<InvalidNameError | InvalidSessionValueError, Whatsapp> {
    const whatsapp = new Whatsapp(props, id);

    return right(whatsapp);
  }
}
