import { Session, WhatsappHandler } from "@core/infra/WhatsappHandler";
import { Message } from "whatsapp-web.js";

export const whatsappHandlerAdpter = (handler: WhatsappHandler) => {
  return async (message: Message, whatsappBot?: Session) => {
    await handler.perform(message, whatsappBot);
  };
};
