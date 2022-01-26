import { User } from 'modules/users';

export const useFilter = (keyword: string, users: User[]) =>
  !!keyword.length
    ? users.filter(({ userName }) =>
        userName?.toLowerCase().includes(keyword.toLowerCase()),
      )
    : users;
