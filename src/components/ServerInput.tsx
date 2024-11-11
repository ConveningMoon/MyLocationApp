import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setServerAddress } from '../redux/locationSlice';

const ServerInput = () => {
  const [address, setAddress] = React.useState('');
  const dispatch = useDispatch();

  const onSetAddress = () => {
    dispatch(setServerAddress(address));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Server Address"
        value={address}
        onChangeText={setAddress}
        autoCapitalize="none"
        keyboardType="url"
      />
      <Button title="Set Server Address" onPress={onSetAddress} />
    </View>
  );
};

export default ServerInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
});
