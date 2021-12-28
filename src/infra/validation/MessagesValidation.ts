import { Message as WbotMessage } from "whatsapp-web.js";

export function ValidateMessage(message: WbotMessage): boolean {
  if (message.from === "status@broadcast") return false;

  if (
    message.type === "chat" ||
    message.type === "audio" ||
    message.type === "ptt" ||
    message.type === "video" ||
    message.type === "image" ||
    message.type === "document" ||
    message.type === "vcard" ||
    message.type === "sticker"
  ) {
    return true;
  }
  return false;
}
