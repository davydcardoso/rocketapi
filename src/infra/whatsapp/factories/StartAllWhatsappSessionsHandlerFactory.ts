import { PrismaWhatsappRepository } from "@modules/whatsapp/repositories/prisma/PrismaWhatsappRepository";
import { WhatsappConsumer } from "../consumer";
import { StartAllWhatsappSessionsHandler } from "../handlers/StartAllWhatsappSessionsHandler";

export async function makeStartAllWhatsappSessionsHandlerFactory(): Promise<void> {
  const prismaWhatsappRepository = new PrismaWhatsappRepository();

  const whatsappConsumer = new WhatsappConsumer(prismaWhatsappRepository);

  const startAllWhatsappSessionsHandler = new StartAllWhatsappSessionsHandler(
    prismaWhatsappRepository,
    whatsappConsumer
  );

  await startAllWhatsappSessionsHandler.perform();
}
