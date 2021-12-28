import { Contact } from "@modules/contact/domain/contact";
import { Ticket } from "@modules/tickets/domain/ticket";

export class FindOrCreateTicketController {
  constructor(
    private
  ){}

  async perform(
    contact: Contact,
    whatsappId: number,
    unreadMessages: number,
    groupContact?: Contact
  ): Promise<Ticket> {

  }
}
