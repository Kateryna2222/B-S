import './style/reset.css';
import './style/main.scss';
import { router } from './router/router.jsx';
import { store } from './store/store.js';

import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App
