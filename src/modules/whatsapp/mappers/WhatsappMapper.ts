import { Whatsapps, Queues, Tickets } from "@prisma/client";
import { WhatsappSession } from "../dtos/WhatsappSession";

type PersistenceRaw = Whatsapps & {
  queues: Queues[];
};

export class WhatsappMapper {
  static toDto(raw: PersistenceRaw): WhatsappSession {
    return {
      id: raw.id,
      whatsappId: raw.whatsappId,
      name: raw.name,
      session: raw.sessions,
      qrcode: raw.qrcode,
      status: raw.status,
      battery: raw.battery,
      plugged: raw.plugged,
      retries: raw.retries,
      is_default: raw.is_default,
      greeting_message: raw.greeting_message,
      farewell_message: raw.farewell_message,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
      queue: raw.queues.map((queue) => {
        return {
          id: queue.id,
          name: queue.name,
          color: queue.color,
          greeting_message: queue.greeting_message,
        };
      }),
    };
  }
}
