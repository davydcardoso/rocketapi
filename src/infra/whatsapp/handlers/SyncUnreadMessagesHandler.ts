import { Client } from "whatsapp-web.js";
import { whatsappHandlerAdpter } from "../adpters/WhatsappHandlerAdpter";
import { makeWhatsappBotMessagesHandlerFactory } from "../factories/WhatsappBotMessagesHandlerFactory";

interface Session extends Client {
  id?: number;
}

export async function makeSyncUnreadMessagesHandler(
  whatsappBot: Session
): Promise<void> {
  const makeWhatsappBotMessages = whatsappHandlerAdpter(
    makeWhatsappBotMessagesHandlerFactory()
  );

  const chats = await whatsappBot.getChats();

  for (const chat of chats) {
    if (chat.unreadCount > 0) {
      const unreadMessage = await chat.fetchMessages({
        limit: chat.unreadCount,
      });

      for (const message of unreadMessage) {
        await makeWhatsappBotMessages(message, whatsappBot);
      }

      await chat.sendSeen();
    }
  }
}
