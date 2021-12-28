import { getWebsocketServer } from "@infra/websocket/server";
import { WhatsappSession } from "@modules/whatsapp/dtos/WhatsappSession";
import { IWhatsappRepository } from "@modules/whatsapp/repositories/IWhatsappRepository";
import { logger } from "@util/logger";

export class WhatsappConsumer {
  constructor(private whatsappRepository: IWhatsappRepository) {}
  async perfom(whatsapp: WhatsappSession): Promise<void> {
    await this.whatsappRepository.updateStatus(whatsapp.id, "OPENING");

    const websocket = getWebsocketServer();

    websocket.emit("whatsappSession", {
      action: "update",
      session: whatsapp,
    });

    try {
      const whatsappBote
    } catch (err) {
      logger.error(err);
    }

  }
}
