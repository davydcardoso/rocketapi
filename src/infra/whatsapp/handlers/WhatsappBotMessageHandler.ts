import { Session, WhatsappHandler } from "@core/infra/WhatsappHandler";
import { Message } from "whatsapp-web.js";
import * as Sentry from "@sentry/node";
import { logger } from "@util/logger";
import { ValidateMessage } from "@infra/validation/MessagesValidation";
import {
  Contact as WbotContact,
  Message as WbotMessage,
  MessageAck,
  Client,
} from "whatsapp-web.js";
import { ContactValidation } from "@infra/validation/ContactValidation";
import { Contact } from "@modules/contact/domain/contact";
import { IWhatsappRepository } from "@modules/whatsapp/repositories/IWhatsappRepository";

export class WhatsappBotMessageHandler implements WhatsappHandler {
  constructor(
    private whatsappRepository: IWhatsappRepository,
    private contactValidation: ContactValidation
  ) {}

  async perform(message: Message, whatsappBot?: Session): Promise<void> {
    if (!ValidateMessage(message)) {
      return;
    }

    try {
      let messageContact: WbotContact;
      let groupContact: Contact | undefined;

      if (message.fromMe) {
        if (/\u200e/.test(message.body[0])) return;

        if (
          !message.hasMedia &&
          message.type !== "chat" &&
          message.type !== "vcard"
        )
          return;

        messageContact = await whatsappBot.getContactById(message.to);
      } else {
        messageContact = await message.getContact();
      }

      const chat = await message.getChat();

      if (chat.isGroup) {
        let messageGroupContact;

        messageGroupContact = await whatsappBot.getContactById(
          message.fromMe ? message.to : message.from
        );

        groupContact = await this.contactValidation.perform(
          messageGroupContact
        );
      }

      const whatsapp = await this.whatsappRepository.findOneByNumberId(
        whatsappBot.id!
      );

      const unreadMessages = message.fromMe ? 0 : chat.unreadCount;

      const contact = await this.contactValidation.perform(messageContact);

      if (unreadMessages === 0 && whatsapp.farewell_message === message.body)
        return;

      const ticket
      
    } catch (err) {
      Sentry.captureException(err);
      logger.error(`Error handling whatsapp message: Err: ${err}`);
    }
  }
}
