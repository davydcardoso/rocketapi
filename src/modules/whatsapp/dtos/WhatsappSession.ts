export type WhatsappSession = {
  id?: string;
  whatsappId: number;
  name: string;
  session: string;
  qrcode: string;
  status: string;
  battery: string;
  plugged: boolean;
  retries: number;
  greeting_message: string;
  farewell_message: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
  queue?: Array<{
    id?: string;
    name: string;
    color: string;
    greeting_message: string;
    created_at?: Date;
    updated_at?: Date;
  }>
};
