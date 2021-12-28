import WAWebJS, { Client } from "whatsapp-web.js";

export interface Session extends Client {
  id?: number;
}

const sessions: Session[] = [];
export interface WhatsappHandler<T = any> {
  perform(message: WAWebJS.Message, whatsappBot?: Session): Promise<void>;
}
