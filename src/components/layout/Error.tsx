import { navigate } from '@reach/router';
import { Button } from 'components';
import { selectUser } from 'modules/authentication';
import { Routes } from 'fixtures';
import { useSelector } from 'react-redux';
import classes from './style/Error.module.css';

export const Error: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div className={classes.error}>
      <Button
        type="submit"
        onClick={() =>
          user ? navigate(Routes.Messages) : navigate(Routes.Login)
        }
      >
        The page you are looking for does not exist. How you get here is a
        mistery. But you can click the button to go back to the homepage
      </Button>
    </div>
  );
};
