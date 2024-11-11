import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationObject } from 'expo-location';

interface LocationState {
  serverAddress: string;
  currentLocation: LocationObject | null;
}

const initialState: LocationState = {
  serverAddress: '',
  currentLocation: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setServerAddress(state, action: PayloadAction<string>) {
      console.log("---------------------------------");
      console.log(`This is the state serverAdress: ${state.serverAddress}`);
      console.log(`This is the action payload: ${action.payload}`);
      state.serverAddress = action.payload;
    },
    updateLocation(state, action: PayloadAction<LocationObject>) {
      console.log(`This is the state current location: ${state.currentLocation}`);
      console.log(`This is the action payload: ${action.payload}`);
      state.currentLocation = action.payload;
    },
  },
});

export const { setServerAddress, updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
