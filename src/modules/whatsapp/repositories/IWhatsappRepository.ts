import { WhatsappSession } from "../dtos/WhatsappSession";

interface IWhatsappProps {
  qrcode?: string;
  status?: string;
  sessions?: string;
  retries: number;
}

export interface IWhatsappRepository {
  findOneByNumberId(id: number): Promise<WhatsappSession>
  findAll(): Promise<WhatsappSession[]>;
  updateStatus(id: string, status: string): Promise<void>;
  updateQrCodeStatus(id: string, data: IWhatsappProps): Promise<void>;
  updateSession(id: string, session: string): Promise<void>
  updateData(id: string, data: IWhatsappProps): Promise<void>
}
