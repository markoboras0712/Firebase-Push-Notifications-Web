import { useSelector } from 'react-redux';

import { selectAllMessages } from 'modules/chat';
import { selectAllOtherUsers, User } from 'modules/users';

export const useContact = () => {
  const users = useSelector(selectAllOtherUsers);
  const messages = useSelector(selectAllMessages);

  const findUser = (id: string) => {
    return users.find(({ uid }) => uid === id) as User;
  };

  const allDates = messages.map(({ createdAt }) => createdAt as Date);

  const maxDate = !!allDates.length
    ? allDates.reduce((a, b) => (a > b ? a : b)).toLocaleDateString()
    : '';

  return { maxDate, findUser };
};
