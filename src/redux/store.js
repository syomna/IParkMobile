import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
// import dateGeocodeReducer from '../slices/geoCodeSlice';
// import garageSpacesSlice from '../slices/garageSpacesSlice';
// import selectedGarageSlice from '../slices/selectedGarage';
import reservationSlice from './slices/ReservationSlice';

const rootReducer = combineReducers({
  //   dateGeocode: dateGeocodeReducer,
  //   garageSpaces: garageSpacesSlice,
  //   selectedGarage: selectedGarageSlice,
  authSlice: AuthSlice,
  reservation: reservationSlice,
});

const store = configureStore({reducer: rootReducer});
export default store;
