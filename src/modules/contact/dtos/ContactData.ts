interface ExtraInfo {
  name: string;
  value: string;
}

export interface ContactRequest {
  name: string;
  number: string;
  isGroup: boolean;
  email?: string;
  profilePicUrl?: string;
  extraInfo?: ExtraInfo[];
}