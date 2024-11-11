import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import ServerInput from '../components/ServerInput';
import LocationStatus from '../components/LocationStatus';
import { LOCATION_TASK_NAME } from '../constants/LocationConstants';

const HomeScreen = () => {
  const startLocationTracking = async () => {
    try {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== 'granted') {
        Alert.alert('Permission Required', 'Foreground location permission not granted');
        return;
      }
  
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        Alert.alert('Permission Required', 'Background location permission not granted');
        return;
      }
  
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      if (!hasStarted) {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1, // Update every 1 meter
          deferredUpdatesInterval: 1000, // Minimum interval between updates in ms
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: 'Location Tracker',
            notificationBody: 'Tracking your location in the background',
          },
        });
        console.log('Location tracking started');
      } else {
        console.log('Location tracking already started');
      }
    } catch (error) {
      console.error('Error starting location tracking:', error);
    }
  };

  useEffect(() => {
    startLocationTracking();
  }, []);

  return (
    <View style={styles.container}>
      <ServerInput />
      <LocationStatus />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
