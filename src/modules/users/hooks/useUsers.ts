import { selectUser, selectUserActiveChats } from 'modules/authentication';
import {
  selectKeyword,
  selectAllOtherUsers,
  useFilter,
  fetchInboxUsers,
  selectInboxUsers,
} from 'modules/users';
import { useDispatch, useSelector } from 'react-redux';

export const useUsers = () => {
  const users = useSelector(selectAllOtherUsers);
  const inboxUsers = useSelector(selectInboxUsers);
  const userChats = useSelector(selectUserActiveChats);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);

  const filteredContacts = useFilter(keyword, users);

  const getAllInboxUsers = () => {
    if (userChats) {
      dispatch(fetchInboxUsers(user));
    }
  };

  const filteredInbox = useFilter(keyword, inboxUsers);

  return { filteredContacts, filteredInbox, getAllInboxUsers };
};
