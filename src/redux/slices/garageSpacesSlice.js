/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const garageSpacesSlice = createSlice({
    name: 'garageSpaces',
    initialState: {
        data: null,
    },
    reducers:{
        getNearbyGarageSpaces: (state, {payload}) => {
            state.data = [...payload];
        },
    },
});

export const {getNearbyGarageSpaces} = garageSpacesSlice.actions;
export default garageSpacesSlice.reducer;
