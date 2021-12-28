import { prisma } from "@infra/prisma/connection";
import { WhatsappSession } from "@modules/whatsapp/dtos/WhatsappSession";
import { WhatsappMapper } from "@modules/whatsapp/mappers/WhatsappMapper";
import { IWhatsappRepository } from "../IWhatsappRepository";

interface IWhatsappProps {
  qrcode?: string;
  status?: string;
  sessions?: string;
  retries: number;
}

export class PrismaWhatsappRepository implements IWhatsappRepository {
  async findOneByNumberId(id: number): Promise<WhatsappSession> {
    const data = await prisma.whatsapps.findFirst({
      where: { whatsappId: id },
      include: {
        queues: true,
      },
      orderBy: {
        name: "desc",
      },
    });

    return WhatsappMapper.toDto(data);
  }

  async findAll(): Promise<WhatsappSession[]> {
    const whatsapps = await prisma.whatsapps.findMany({
      include: {
        queues: {
          select: {
            id: true,
            name: true,
            color: true,
            greeting_message: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });

    return whatsapps.map((whatsapp) => WhatsappMapper.toDto(whatsapp));
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await prisma.whatsapps.update({
      where: { id },
      data: { status },
    });
  }

  async updateQrCodeStatus(
    id: string,
    { qrcode, status, retries }: IWhatsappProps
  ): Promise<void> {
    await prisma.whatsapps.update({
      where: { id },
      data: {
        qrcode,
        status,
        retries,
      },
    });
  }

  async updateSession(id: string, sessions: string): Promise<void> {
    await prisma.whatsapps.update({
      where: { id },
      data: { sessions },
    });
  }

  async updateData(
    id: string,
    { retries, sessions }: IWhatsappProps
  ): Promise<void> {
    await prisma.whatsapps.update({
      where: { id },
      data: { retries, sessions },
    });
  }
}
