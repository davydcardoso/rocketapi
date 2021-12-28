import { WhatsappHandler } from "@core/infra/WhatsappHandler";
import { IWhatsappRepository } from "@modules/whatsapp/repositories/IWhatsappRepository";
import { WhatsappConsumer } from "../consumer";

export class StartAllWhatsappSessionsHandler implements WhatsappHandler {
  constructor(
    private whatsappRepository: IWhatsappRepository,
    private consumer: WhatsappConsumer
  ) {}

  async perform(): Promise<void> {
    const whatsapps = await this.whatsappRepository.findAll();

    whatsapps.forEach(async (whatsapp) => this.consumer.perfom(whatsapp));
  }
}
