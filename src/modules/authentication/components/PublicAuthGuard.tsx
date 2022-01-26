import { navigate } from '@reach/router';
import { selectUser, selectUserLoading } from 'modules/authentication';
import { Routes } from 'fixtures';
import { selectUsersLoading } from 'modules/users';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from 'components';

export const PublicAuthGuard: React.FC = ({ children }) => {
  const user = useSelector(selectUser);
  const userLoading = useSelector(selectUserLoading);
  const usersLoading = useSelector(selectUsersLoading);

  useEffect(() => {
    if (!userLoading && !!user.id) {
      navigate(Routes.Contacts);
    }
  }, [user]);

  if (userLoading || usersLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};
