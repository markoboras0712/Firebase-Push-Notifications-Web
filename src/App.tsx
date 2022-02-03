import './App.css';
import { AuthListener } from 'modules/authentication';
import { Routing } from 'modules/routing';

export const App: React.FC = () => {
  return (
    <AuthListener>
      <Routing />
    </AuthListener>
  );
};
