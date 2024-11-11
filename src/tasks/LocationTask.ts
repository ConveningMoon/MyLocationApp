import * as TaskManager from 'expo-task-manager';
import { LocationObject } from 'expo-location';
import { store } from '../redux/store';
import { updateLocation } from '../redux/locationSlice';
import * as Notifications from 'expo-notifications';
import { LOCATION_TASK_NAME } from '../constants/LocationConstants';

TaskManager.defineTask(
  LOCATION_TASK_NAME,
  ({ data, error }: TaskManager.TaskManagerTaskBody<{ locations: LocationObject[] }>) => {
    if (error) {
      console.error('Location task error:', error.message);
      return;
    }
    if (data) {
      const { locations } = data;
      if (locations && locations.length > 0) {
        const location = locations[0];
        console.log('Received new location:', location);

        // Update Redux store
        store.dispatch(updateLocation(location));

        // Send to server
        const state = store.getState();
        const serverAddress = state.location.serverAddress;

        if (serverAddress) {
          fetch(serverAddress, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(location),
          })
            .then(() => {
              // Trigger push notification
              Notifications.scheduleNotificationAsync({
                content: { title: 'Location Sent', body: 'Your location was sent to the server.' },
                trigger: null,
              });
            })
            .catch((err) => {
              console.error('Error sending location to server:', err);
            });
        } else {
          console.warn('Server address is not set.');
        }
      }
    }
  }
);
