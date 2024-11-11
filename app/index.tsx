import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import HomeScreen from '../src/screens/HomeScreen';

import '../src/tasks/LocationTask';
import '../src/notifications/PushNotificationHandler';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen /> 
    </Provider>
  ); 
}
