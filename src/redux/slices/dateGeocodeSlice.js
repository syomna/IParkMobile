/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const dateGeocodeSlice = createSlice({
  name: 'dateGeocode',
  initialState: {
    geocode: {},
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    duration: {},
  },
  reducers: {
    setGeocode: (state, action) => {
      state.geocode = action.payload;
      console.log(state.geocode);
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
      console.log(state.startTime);
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
      console.log(state.endTime);
    },
    setDuration: (state, action) => {
      const {days, hours, minutes} = action.payload;
      state.duration = {
        days: days,
        hours: hours,
        minutes: minutes,
      };
      console.log(state.duration);
    },
  },
});

export const {setGeocode, setStartTime, setEndTime, setDuration} =
  dateGeocodeSlice.actions;
export default dateGeocodeSlice.reducer;
