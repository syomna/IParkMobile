import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {FirebaseCollections} from '../../utils/FirebaseCollections';
export const reserveGarage = createAsyncThunk(
  'reservation/reserve',
  async ({garageId, uid, availableSpots}) => {
    try {
      console.log(`${garageId} ${uid} ${availableSpots}`);

      if (availableSpots && garageId) {
        console.log(`availableSpots ${availableSpots}`);
        const body = {availableSpots: availableSpots - 1};

        // const url = `https://parking-system-eaece-default-rtdb.firebaseio.com/Garages/0.json`;
        const url = `${FirebaseCollections.baseURL}/garage-collection/${garageId}.json`;
        console.log(`garage url ${url}`);
        await axios.patch(url, body);
        console.log('done garage');
      }

      if (uid && garageId) {
        const url = `${FirebaseCollections.baseURL}/${FirebaseCollections.userCollection}`;
        console.log(`user url ${url}`);
        const res = await axios.get(url);
        const data = res.data;
        console.log(data);
        const filteredUser = Object.entries(data).find(
          ([key, value]) => value.ownerId === uid,
        );
        console.log(`filteredUser ${filteredUser}`);
        if (filteredUser) {
          const [id, userData] = filteredUser;
          console.log(`user ${id} ${userData}`);
          const patchUrl = `${FirebaseCollections.baseURL}/user-collection/${id}/${FirebaseCollections.reservedGarages}`;
          await axios.post(patchUrl, {
            garageId: garageId,
          });
          console.log('done user');
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
);

const ReservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    isLoading: false,
    successMessage: null,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(reserveGarage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(reserveGarage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = 'Reservation successful';
        state.errorMessage = null;
      })
      .addCase(reserveGarage.rejected, (state, action) => {
        state.isLoading = false;
        state.successMessage = null;
        state.errorMessage = 'Reservation failed';
      });
  },
});

export default ReservationSlice.reducer;
