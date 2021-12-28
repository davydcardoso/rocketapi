import { WhatsappHandler } from "@core/infra/WhatsappHandler";
import { WhatsappBotMessageHandler } from "../handlers/WhatsappBotMessageHandler";

export function makeWhatsappBotMessagesHandlerFactory(): WhatsappHandler {
  const whatsappBotMessageHandler = new WhatsappBotMessageHandler();

  return whatsappBotMessageHandler;
}
