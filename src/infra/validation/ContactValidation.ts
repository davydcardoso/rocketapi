import { Contact } from "@modules/contact/domain/contact";
import { IContactRepository } from "@modules/contact/repositories/IContactRepository";
import {
  Contact as WbotContact,
  Message as WbotMessage,
  MessageAck,
  Client,
} from "whatsapp-web.js";

export class ContactValidation {
  constructor(private contactRepository: IContactRepository) {}

  async perform(msgContact: WbotContact): Promise<Contact> {
    const profilePicUrl = await msgContact.getProfilePicUrl();

    const contactData = {
      name: msgContact.name || msgContact.pushname || msgContact.id.user,
      number: msgContact.id.user,
      profilePicUrl,
      isGroup: msgContact.isGroup,
    };

    const contact =
      await this.contactRepository.createOrUpdate(contactData);

    return contact;
  }
}
