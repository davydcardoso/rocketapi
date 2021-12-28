import { prisma } from "@infra/prisma/connection";
import { getWebsocketServer } from "@infra/websocket/server";
import { Contact } from "@modules/contact/domain/contact";
import { ContactRequest } from "@modules/contact/dtos/ContactData";
import { ContactMapper } from "@modules/contact/mappers/ContactMapper";
import { v4 } from "uuid";
import { IContactRepository } from "../IContactRepository";

export class PrismaContactRepository implements IContactRepository {
  async createOrUpdate({
    name,
    number: rawNumber,
    profilePicUrl,
    isGroup,
    email = "",
    extraInfo = [],
  }: ContactRequest): Promise<Contact> {
    const number = isGroup ? rawNumber : rawNumber.replace(/[^0-9]/g, "");

    const websocket = getWebsocketServer();

    let contact = await this.findOne(number);

    if (contact) {
      await this.updateAvatar(contact.id, profilePicUrl);

      websocket.emit("contact", {
        action: "update",
        contact,
      });
    } else {
      const data = ContactMapper.toDomain({
        id: v4(),
        name,
        number,
        profile_pic_url: profilePicUrl,
        email,
        is_group: isGroup,
        created_at: new Date(),
        updated_at: new Date(),
      });

      contact = await this.create(data);

      websocket.emit("contact", {
        action: "create",
        contact,
      });
    }

    return contact;
  }

  async findOne(number: string): Promise<Contact> {
    const contact = await prisma.contacts.findUnique({ where: { number } });

    if (!contact) {
      return null;
    }

    return ContactMapper.toDomain(contact);
  }

  async updateAvatar(id: string, photo: string): Promise<void> {
    await prisma.contacts.update({
      where: { id },
      data: {
        profile_pic_url: photo,
      },
    });
  }

  async create(contact: Contact): Promise<Contact> {
    const data = ContactMapper.toPersistence(contact);

    const newContact = await prisma.contacts.create({ data });

    return ContactMapper.toDomain(newContact);
  }
}
