export interface User {
  email?: string | undefined | null;
  uid: string;
  userName: string;
  userPhoto: string;
  activeChats: string[];
  fcmToken?: string;
}

export interface AllUsers {
  allUsers: User[];
  inboxUsers: User[];
  user: User;
  keyword: string;
  isLoading: boolean;
  error: string | unknown;
}
