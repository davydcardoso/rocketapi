export type UsersWithDetails = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  token_version: number;
  profile: string;
  created_at?: Date;
  updated_at?: Date;
  queues?: Array<{
    id: string;
    name?: string;
    color?: string;
    greeting_message?: string;
    created_at?: Date;
    updated_at?: Date | null;
  }>;
};
