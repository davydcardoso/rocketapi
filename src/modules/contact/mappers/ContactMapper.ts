import { Contacts, Contacts as PersistenceContacts } from "@prisma/client";
import { Contact } from "../domain/contact";
import { ContactWithDetails } from "../dtos/ContactWithDetails";

type PersistenceRaw = Contacts & {};

export class ContactMapper {
  static toDto(raw: PersistenceRaw): ContactWithDetails {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      number: raw.number,
      is_group: raw.is_group,
      profile_pic_url: raw.profile_pic_url,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    };
  }

  static toDomain(raw: PersistenceContacts): Contact {
    const contactOrError = Contact.create({
      id: raw?.id,
      name: raw.name,
      email: raw.email,
      number: raw.number,
      is_group: raw.is_group,
      profile_pic_url: raw.profile_pic_url,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });

    if (contactOrError.isRight()) {
      return contactOrError.value;
    }

    return null;
  }

  static toPersistence(contact: Contact) {
    return {
      name: contact.name,
      number: contact.number,
      email: contact.email,
      profile_pic_url: contact.profile_pic_url,
      is_group: contact.is_group,
      created_at: contact.created_at,
      updated_at: contact.updated_at,
    };
  }
}
