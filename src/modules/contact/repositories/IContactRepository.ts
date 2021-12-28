import { Contact } from "../domain/contact";
import { ContactRequest } from "../dtos/ContactData";

export interface IContactRepository {
  createOrUpdate(data: ContactRequest): Promise<Contact>;
}
