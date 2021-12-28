import { prisma } from "@infra/prisma/connection";
import { Ticket } from "@modules/tickets/domain/ticket";
import { ITicketRepository } from "../ITicketRepository";

interface ITicketData {
  status?: string;
  userId?: string;
  unread_messages?: number;
}

export class PrismaTicketRepository implements ITicketRepository {
  async updateData(
    id: string,
    { status, unread_messages, userId }: ITicketData
  ): Promise<void> {
    await prisma.tickets.update({
      where: { id },
      data: {
        status,
        unread_messages,
      },
    });
  }

  async updatedUnreadMessage(
    id: string,
    unreadMessages: string
  ): Promise<void> {}

  async findOne(contactId: string): Promise<any> {}
}
