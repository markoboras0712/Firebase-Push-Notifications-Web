export interface Message {
  text?: string;
  uid: string;
  to: string;
  userName?: string;
  userPhoto?: string;
  createdAt?: Date;
  id?: string;
  date?: Date;
  subCollection?: string;
}

export interface AllMessages {
  allMessages: Message[];
  loading: boolean;
  error: string | unknown;
}
