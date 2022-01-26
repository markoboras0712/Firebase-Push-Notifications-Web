import { selectUserActiveChats } from 'modules/authentication';
import { setMessagesListener } from 'modules/chat';
import { selectAllOtherUsers } from 'modules/users';
import { useDispatch, useSelector } from 'react-redux';

export const useMessages = () => {
  const dispatch = useDispatch();
  const myChats = useSelector(selectUserActiveChats);
  const users = useSelector(selectAllOtherUsers);

  const getMessages = (id: string) => {
    dispatch(setMessagesListener(id));
  };

  const findIdOfChat = (id: string) => {
    const otherUsersActiveChats = users
      .find((user) => user.uid === id)
      ?.activeChats.map((chat) => chat);

    return (myChats as string[]).find((chat) =>
      otherUsersActiveChats?.includes(chat),
    );
  };

  return {
    getMessages,
    findIdOfChat,
  };
};
