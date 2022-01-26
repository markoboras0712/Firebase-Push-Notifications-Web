import { SerializedError } from '@reduxjs/toolkit';

export interface AuthData {
  id: string;
  displayName?: string | null;
  email: string | null;
  photoUrl: string | null;
  activeChats?: string[];
}

export class AuthData {
  constructor({ id, displayName, email, photoUrl, activeChats }: AuthData) {
    this.id = id;
    this.displayName = displayName;
    this.email = email;
    this.photoUrl = photoUrl;
    this.activeChats = activeChats;
  }
}

export interface Auth {
  data: AuthData;
  error?: SerializedError | string;
  isLoading?: boolean;
}
