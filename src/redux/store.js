/* eslint-disable prettier/prettier */
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
// import dateGeocodeReducer from '../slices/geoCodeSlice';
import garageSpacesSlice from './slices/garageSpacesSlice';
import selectedGarageSlice from './slices/selectedGarage';
// import signUpData from '../slices/signupSlice';
// import loginData from '../slices/loginSlice';
import reservationSlice from './slices/ReservationSlice';
import dateGeocodeSlice from './slices/dateGeocodeSlice';

const rootReducer = combineReducers({
  dateGeocode: dateGeocodeSlice,
  garageSpaces: garageSpacesSlice,
  selectedGarage: selectedGarageSlice,
  //   signupReducer: signUpData,
  //   loginReducer: loginData,
  authSlice: AuthSlice,
  reservation: reservationSlice,
});

const store = configureStore({reducer: rootReducer});
export default store;
