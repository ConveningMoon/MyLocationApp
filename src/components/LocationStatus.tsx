import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const LocationStatus = () => {
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);
  const serverAddress = useSelector((state: RootState) => state.location.serverAddress);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Status</Text>
      <Text>Server Address: {serverAddress || 'Not set'}</Text>
      {currentLocation ? (
        <>
          <Text>Latitude: {currentLocation.coords.latitude}</Text>
          <Text>Longitude: {currentLocation.coords.longitude}</Text>
          <Text>
            Timestamp: {new Date(currentLocation.timestamp).toLocaleString()}
          </Text>
        </>
      ) : (
        <Text>No location data available.</Text>
      )}
    </View>
  );
};

export default LocationStatus;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
});
