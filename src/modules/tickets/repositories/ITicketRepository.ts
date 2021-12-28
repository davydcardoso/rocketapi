import { Ticket } from "../domain/ticket";

interface ITicketData {
  status?: string;
  userId?: string;
  unreadMessage?: string;
}

export interface ITicketRepository {
  findOne(contactId: string): Promise<Ticket>;
  updatedUnreadMessage(id: string, unreadMessages: string): Promise<void>;
  updateData(id: string, data: ITicketData): Promise<void>;
}
