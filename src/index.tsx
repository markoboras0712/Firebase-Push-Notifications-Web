import { store } from 'modules/redux-store';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from 'App';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}
